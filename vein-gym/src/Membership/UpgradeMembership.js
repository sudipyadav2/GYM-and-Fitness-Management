import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, getDocs, doc, updateDoc,getDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Chip
} from "@mui/material";

export default function UpgradeMembership() {
  const [plans, setPlans] = useState([]);
  const [currentPlanId, setCurrentPlanId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const load = async () => {
      const plansSnap = await getDocs(collection(db, "membershipPlans"));
      const plansData = plansSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      setPlans(plansData);

      const userSnap = await getDoc(doc(db, "users", user.uid));
      if (userSnap.exists()) {
        const m = userSnap.data().membership;
        if (m) setCurrentPlanId(m.planId);
      }
    };
    if (user) load();
  }, [user]);

  const handleUpgrade = async (plan) => {
    if (plan.id === currentPlanId) return alert("Already on this plan");

    const userRef = doc(db, "users", user.uid);
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    await updateDoc(userRef, {
      membership: {
        planId: plan.id,
        planName: plan.name,
        price: plan.price,
        status: "active",
        renewalDate: nextMonth.toISOString().slice(0, 10)
      }
    });

    alert(`Upgraded to ${plan.name}`);
  };

  return (
    <Container sx={{ mt: 10, pb: 6 }}>
      <Typography
        variant="h3"
        sx={{ fontWeight: 800, textAlign: "center", mb: 4, color: "#00E5FF" }}
      >
        Upgrade Membership
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 4
        }}
      >
        {plans.map(plan => (
          <Paper
            key={plan.id}
            sx={{
              p: 4,
              borderRadius: "20px",
              background: "linear-gradient(145deg,#020617,#0B1120)",
              color: "white",
              border:
                plan.id === currentPlanId
                  ? "2px solid #00E5FF"
                  : "1px solid rgba(0,229,255,0.25)"
            }}
            elevation={6}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" fontWeight={700}>
                {plan.name}
              </Typography>
              {plan.id === currentPlanId && (
                <Chip
                  label="CURRENT"
                  sx={{
                    background: "#00E5FF",
                    color: "#000",
                    fontWeight: 700
                  }}
                />
              )}
            </Box>

            <Typography
              variant="h3"
              sx={{ fontWeight: 900, mt: 1, color: "#00E5FF" }}
            >
              £{plan.price}
              <Typography component="span" sx={{ fontSize: 14, opacity: 0.7 }}>
                /month
              </Typography>
            </Typography>

            <Box sx={{ mt: 2 }}>
              {plan.features?.map((f, i) => (
                <Chip
                  key={i}
                  label={f}
                  sx={{
                    m: 0.5,
                    background: "rgba(0,229,255,0.12)",
                    color: "#E0F7FA",
                    fontSize: 12
                  }}
                />
              ))}
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.4,
                background:
                  plan.id === currentPlanId ? "rgba(255,255,255,0.2)" : "#00E5FF",
                color: plan.id === currentPlanId ? "#999" : "#000",
                fontWeight: 700,
                borderRadius: "12px"
              }}
              disabled={plan.id === currentPlanId}
              onClick={() => handleUpgrade(plan)}
            >
              {plan.id === currentPlanId ? "Current Plan" : "Upgrade"}
            </Button>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}
