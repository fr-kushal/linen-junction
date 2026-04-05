const API_URL = import.meta.env.VITE_API_URL;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";
import CareAssistant from "./components/CareAssistant";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import AdminDashboard from "./pages/AdminDashboard";
import OrderHistory from "./pages/OrderHistory";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import OurStory from "./pages/OurStory";
import Archive from "./pages/Archive";
import Newsletter from "./pages/Newsletter";
import SizeGuide from "./pages/SizeGuide";
import FabricCare from "./pages/FabricCare";
import ShippingPolicy from "./pages/ShippingPolicy";
import ReturnsPolicy from "./pages/ReturnsPolicy";
import ReturnRequest from "./pages/ReturnRequest";
import CustomerSupport from "./pages/CustomerSupport";
import CareArchive from "./pages/CareArchive";
import TrackOrder from "./pages/TrackOrder";
import OrderTrackingDetail from "./pages/OrderTrackingDetail";
import { Product, CartItem, User, TailoringJob } from "./types";
import { API_URL, createJob } from "./api";

const App: React.FC = () => {
  const [page, setPage] = useState<string>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [scrollToId, setScrollToId] = useState<string | undefined>(undefined);
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(
    undefined,
  );
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("linen_junction_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<{
    orderId: string;
    name: string;
  } | null>(null);
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("linen_junction_session");
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("linen_junction_session") !== null;
  });
  const [tailoringJobs, setTailoringJobs] = useState<TailoringJob[]>([]);

  // useEffect(() => {
  //   const loadJobs = async () => {
  //     try {
  //       const jobs = await getJobs();

  //       const formatted = jobs.map((job: any) => ({
  //         id: job.id,
  //         orderId: job.id,
  //         customerName: job.customerName,
  //         productName: job.productName,
  //         productImage: "",
  //         measurements: { chest: "", waist: "", shoulder: "", length: "" },
  //         currentStatus: job.status,
  //         statusHistory: [],
  //         examples: [],
  //       }));

  //       setTailoringJobs(formatted);
  //     } catch (err) {
  //       console.error("Failed to load jobs", err);
  //     }
  //   };

  //   loadJobs();
  // }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/api/orders`);
        const data = await res.json();

        console.log("Fetched orders:", data);

        const jobs = data.flatMap((order: any) =>
          order.items
            .filter((item: any) => item.addTailoringService)
            .map((item: any) => ({
              id: order.id,
              orderId: order.id,
              customerName: "Customer",
              productName: item.name,
              productImage: item.images?.[0] || "",
              measurements: item.measurements || {},
              fabricLength: item.selectedMeters,
              currentStatus: "Fabric Received",
              statusHistory: [],
              examples: [],
            })),
        );

        setTailoringJobs(jobs);
      } catch (err) {
        console.error("Failed to fetch orders ❌", err);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    localStorage.setItem("linen_junction_cart", JSON.stringify(cart));
  }, [cart]);

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("linen_junction_session", JSON.stringify(userData));
    if (page === "auth") setPage("checkout");

    if (userData.role === "admin") {
      setPage("admin");
    } else if (page === "auth") {
      setPage("checkout");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("linen_junction_session");
    setPage("home");
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setScrollToId(product.id);
    setPage("product");
    window.scrollTo(0, 0);
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.findIndex(
        (i) =>
          i.id === item.id &&
          i.selectedMeters === item.selectedMeters &&
          i.selectedColor === item.selectedColor,
      );

      if (existing >= 0) {
        const newCart = [...prev];
        newCart[existing].quantity += item.quantity;
        return newCart;
      }

      return [...prev, item];
    });

    setIsCartOpen(true);
  };

  const quickAdd = (product: Product, meters: string) => {
    const item: CartItem = {
      ...product,
      selectedMeters: parseFloat(meters || product.availableLengths[0]),
      selectedColor: product.colors[0],
      addTailoringService: false,
      quantity: 1,
    };
    addToCart(item);
  };

  const removeFromCart = (id: string, meters: number, color: string) => {
    setCart((prev) =>
      prev.filter(
        (i) =>
          !(
            i.id === id &&
            i.selectedMeters === meters &&
            i.selectedColor === color
          ),
      ),
    );
  };

  const updateCartQuantity = (
    id: string,
    meters: number,
    color: string,
    delta: number,
  ) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (
          item.id === id &&
          item.selectedMeters === meters &&
          item.selectedColor === color
        ) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const completeOrder = async (orderDetails: {
    email: string;
    phone: string;
    name: string;
    measurements?: Record<string, string>;
  }) => {
    // Simulate notification sending
    console.log("Sending Order Confirmation Email to:", orderDetails.email);
    console.log("Sending Order Confirmation SMS to:", orderDetails.phone);

    // In a real app, you would call an API here:
    // await fetch('/api/notify', { method: 'POST', body: JSON.stringify(orderDetails) });

    // Sync order to history if user is logged in
    if (user) {
      const newJob: TailoringJob = {
        id: `TJ-${Math.floor(Math.random() * 1000)}`,
        orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
        customerName: user.name,
        productName: cart[0]?.name || "Textile Selection",
        productImage: cart[0]?.images[0] || "",
        measurements: orderDetails.measurements || {
          chest: "0",
          waist: "0",
          shoulder: "0",
          length: "0",
        },
        currentStatus: "Order Received",
        statusHistory: [
          {
            status: "Order Received",
            timestamp: new Date().toISOString(),
            note: "Registry entry created.",
          },
        ],
        examples: cart[0]?.images || [],
      };
      setTailoringJobs((prev) => [newJob, ...prev]);
      await createJob({
        id: newJob.id,
        customerName: newJob.customerName,
        productName: newJob.productName,
        status: "Fabric Sourcing & Inspection",
        tailor: "Unassigned",
      });
    }

    setCart([]);
    setPage("orders");
    window.scrollTo(0, 0);

    // Show a more professional notification
    const notificationMsg = `Order Confirmed! A notification has been dispatched to ${orderDetails.email} and ${orderDetails.phone}.`;
    alert(notificationMsg);
  };

  const navigateToShop = (category?: string) => {
    setCategoryFilter(category);
    setSearchQuery("");
    setScrollToId(undefined);
    setPage("shop");
    window.scrollTo(0, 0);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setScrollToId(undefined);
    setPage("shop");
    window.scrollTo(0, 0);
  };

  const handleTrackingConfirm = (orderId: string, name: string) => {
    setTrackingInfo({ orderId, name });
    setPage("tracking-detail");
    window.scrollTo(0, 0);
  };

  const navigateToPage = (target: string) => {
    setPage(target);
    window.scrollTo(0, 0);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setPage(isAuthenticated ? "checkout" : "auth");
    window.scrollTo(0, 0);
  };

  const handleOrders = () => {
    setPage(isAuthenticated ? "orders" : "auth");
    window.scrollTo(0, 0);
  };

  const handleNewArrivals = () => {
    if (page !== "home") {
      setPage("home");
      setTimeout(() => {
        document
          .getElementById("new-arrivals")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document
        .getElementById("new-arrivals")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHomeClick = () => {
    setPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-brand-gold selection:text-brand-earth bg-brand-cream">
      <Navbar
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onAdminClick={() => {
          if (user?.role === "admin") {
            setPage("admin");
          } else {
            setPage("auth");
          }
        }}
        onHomeClick={() => {
          setPage("home");
          window.scrollTo(0, 0);
        }}
        onOrdersClick={handleOrders}
        onShopClick={navigateToShop}
        onSearchSubmit={handleSearch}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />

      <AnimatePresence mode="wait">
        <motion.main
          key={page}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex-grow"
        >
          {page === "home" && (
            <Home
              onProductClick={navigateToProduct}
              onQuickAdd={quickAdd}
              onShopAll={() => navigateToShop()}
              onCategoryClick={navigateToShop}
              onOurStoryClick={() => setPage("our-story")}
            />
          )}
          {page === "shop" && (
            <Shop
              onProductClick={navigateToProduct}
              onQuickAdd={quickAdd}
              initialCategory={categoryFilter}
              externalSearchQuery={searchQuery}
              scrollToProductId={scrollToId}
            />
          )}
          {page === "product" && selectedProduct && (
            <ProductDetails
              product={selectedProduct}
              onAddToCart={addToCart}
              onBack={() => setPage("shop")}
            />
          )}
          {page === "admin" &&
            (user?.role === "admin" ? (
              <AdminDashboard
                tailoringJobs={tailoringJobs}
                setTailoringJobs={setTailoringJobs}
              />
            ) : (
              <Auth onLogin={handleLoginSuccess} />
            ))}
          {page === "orders" && (
            <OrderHistory
              isAuthenticated={isAuthenticated}
              onLoginNavigate={() => setPage("auth")}
              tailoringJobs={tailoringJobs}
            />
          )}
          {page === "checkout" && (
            <Checkout cart={cart} onComplete={completeOrder} user={user} />
          )}
          {page === "support" && (
            <CustomerSupport
              onNavigate={navigateToPage}
              onOpenChat={() => setIsAssistantOpen(true)}
            />
          )}
          {page === "customer-support" && (
            <CustomerSupport
              onNavigate={navigateToPage}
              onOpenChat={() => setIsAssistantOpen(true)}
            />
          )}
          {page === "size-guide" && <SizeGuide />}
          {page === "fabric-care" && (
            <FabricCare
              onOpenChat={() => setIsAssistantOpen(true)}
              onExploreArchive={() => setPage("care-archive")}
            />
          )}
          {page === "care-archive" && <CareArchive />}
          {page === "shipping" && (
            <ShippingPolicy onTrackOrder={() => setPage("track-order")} />
          )}
          {page === "track-order" && (
            <TrackOrder onConfirm={handleTrackingConfirm} />
          )}
          {page === "tracking-detail" && trackingInfo && (
            <OrderTrackingDetail
              orderId={trackingInfo.orderId}
              name={trackingInfo.name}
            />
          )}
          {page === "returns" && (
            <ReturnsPolicy onInitiateReturn={() => setPage("return-request")} />
          )}
          {page === "return-request" && <ReturnRequest />}
          {page === "our-story" && (
            <OurStory
              onExploreArchive={() => setPage("archive")}
              onBeginJourney={() => setPage("auth")}
            />
          )}
          {page === "archive" && <Archive />}
          {page === "newsletter" && (
            <Newsletter onReturnHome={() => navigateToPage("home")} />
          )}
          {page === "auth" && <Auth onLogin={handleLoginSuccess} />}
        </motion.main>
      </AnimatePresence>

      <Footer
        onHomeClick={handleHomeClick}
        onNewArrivalsClick={handleNewArrivals}
        onCategoryClick={navigateToShop}
        onSupportClick={() => navigateToPage("customer-support")}
        onSizeGuideClick={() => navigateToPage("size-guide")}
        onFabricCareClick={() => navigateToPage("fabric-care")}
        onShippingPolicyClick={() => navigateToPage("shipping")}
        onReturnsClick={() => navigateToPage("returns")}
        onNewsletterClick={() => navigateToPage("newsletter")}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateCartQuantity}
        onCheckout={() => {
          setIsCartOpen(false); // close cart
          setPage("checkout"); // 🔥 GO TO CHECKOUT PAGE
        }}
      />

      <CareAssistant isOpen={isAssistantOpen} setIsOpen={setIsAssistantOpen} />
    </div>
  );
};

export default App;
