 

import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const BuyCredit = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } =
    useContext(AppContext);

  const navigate = useNavigate();

  const initPay = (order, planId) => {
    if (!window.Razorpay) {
      toast.error("Payment SDK not loaded");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_Rk3MQ9NfE14POD",
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const verifyRes = await axios.post(
            `${backendUrl}/api/user/verify-razor`,
            {
              planId,
              orderId: order.receipt, // = transaction _id
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            { headers: { token } }
          );

          if (verifyRes.data.success) {
            toast.success("Payment successful. Credits added!");
            await loadCreditsData();
            navigate("/");
          } else {
            toast.error(
              verifyRes.data.message || "Payment verification failed"
            );
          }
        } catch (err) {
          console.error(err);
          toast.error(
            err.response?.data?.message || "Payment verification error"
          );
        }
      },
      prefill: {
        name: user?.name || "",
        email: user?.email || "",
      },
      theme: {
        color: "#111827",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/pay-razor`,
        { planId },
        { headers: { token } }
      );

      if (data.success && data.order) {
        initPay(data.order, planId);
      } else {
        toast.error(data.message || "Unable to start payment");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-[82vh] text-center pt-10 pb-16 px-4 max-w-6xl mx-auto"
    >
      <div className="inline-block px-5 py-1.5 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
        Flexible Pricing
      </div>

      <h1 className="text-3xl sm:text-5xl font-extrabold text-gradient mb-4">
        Choose Your Plan
      </h1>
      <p className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto font-light mb-14">
        Select a credit plan to generate high-resolution AI art. Upgrade or buy credits anytime.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left items-stretch max-w-5xl mx-auto">
        {plans.map((item, index) => {
          const isPopular = item.id.toLowerCase().includes("advanced") || index === 1;
          return (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className={`relative glass-panel rounded-3xl p-8 sm:p-10 border flex flex-col justify-between shadow-2xl transition-all duration-300 ${
                isPopular
                  ? "bg-slate-900/90 border-purple-500/50 shadow-[0_0_35px_rgba(168,85,247,0.25)]"
                  : "bg-slate-900/40 border-white/10 hover:border-white/20"
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[11px] font-extrabold uppercase px-4 py-1 rounded-full shadow-lg tracking-wider">
                  ★ Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-2xl bg-purple-950/60 border border-purple-500/30">
                    <img width={32} src={assets.logo_icon} alt="plan icon" className="filter brightness-125" />
                  </div>
                  <span className="text-xs font-semibold text-purple-300 bg-purple-900/40 px-3 py-1 rounded-full border border-purple-500/20">
                    {item.credits} Credits
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-100 capitalize">{item.id}</h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 font-light min-h-[40px] leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-6 mb-6 pb-6 border-b border-white/10">
                  <span className="text-4xl font-extrabold text-white">${item.price}</span>
                  <span className="text-slate-400 text-sm font-light"> / {item.credits} credits</span>
                </div>

                {/* Feature Checklist */}
                <ul className="space-y-3 mb-8 text-xs sm:text-sm text-slate-300 font-light">
                  <li className="flex items-center gap-2.5">
                    <span className="text-emerald-400 font-bold text-sm">✓</span>
                    <span>High quality 4K generation</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-emerald-400 font-bold text-sm">✓</span>
                    <span>Full commercial licensing</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-emerald-400 font-bold text-sm">✓</span>
                    <span>Priority GPU rendering</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => paymentRazorpay(item.id)}
                className={`w-full font-bold py-3.5 rounded-2xl text-sm transition-all duration-300 cursor-pointer shadow-lg active:scale-95 ${
                  isPopular
                    ? "glow-gradient text-white shadow-[0_0_25px_rgba(124,58,237,0.5)] hover:shadow-[0_0_35px_rgba(124,58,237,0.8)]"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 hover:border-purple-500/40"
                }`}
              >
                {user ? `Buy ${item.id}` : "Get Started"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
