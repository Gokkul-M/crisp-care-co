import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Gift, 
  Clock, 
  Copy,
  Star,
  Percent,
  Calendar,
  Users,
  Check
} from "lucide-react";

const Offers = () => {
  const [selectedTab, setSelectedTab] = useState("active");
  const [copiedCode, setCopiedCode] = useState("");

  const offers = [
    {
      id: "WELCOME20",
      title: "20% OFF First Order",
      description: "Get 20% discount on your first laundry order",
      discount: "20%",
      code: "WELCOME20",
      type: "percentage",
      status: "active",
      validTill: "Dec 31, 2024",
      minOrder: "₹300",
      maxDiscount: "₹100",
      category: "new-user"
    },
    {
      id: "FESTIVE50", 
      title: "Festive Special - ₹50 Off",
      description: "Celebrate the season with ₹50 off on orders above ₹500",
      discount: "₹50",
      code: "FESTIVE50",
      type: "fixed",
      status: "active",
      validTill: "Dec 25, 2024",
      minOrder: "₹500",
      category: "festival"
    },
    {
      id: "REFER100",
      title: "Refer & Earn ₹100",
      description: "Refer friends and earn ₹100 cashback for each successful referral",
      discount: "₹100",
      code: "REFER100",
      type: "referral",
      status: "active", 
      validTill: "Ongoing",
      category: "referral"
    },
    {
      id: "PREMIUM30",
      title: "Premium Member - 30% Off",
      description: "Exclusive discount for premium members",
      discount: "30%",
      code: "PREMIUM30",
      type: "percentage",
      status: "used",
      validTill: "Dec 15, 2024",
      minOrder: "₹400",
      maxDiscount: "₹150",
      category: "premium"
    }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const getOfferIcon = (type: string) => {
    switch (type) {
      case "percentage": return <Percent className="h-5 w-5" />;
      case "referral": return <Users className="h-5 w-5" />;
      default: return <Gift className="h-5 w-5" />;
    }
  };

  const getOfferColor = (category: string) => {
    switch (category) {
      case "new-user": return "bg-blue-500";
      case "festival": return "bg-purple-500";
      case "referral": return "bg-green-500";
      case "premium": return "bg-gold-500";
      default: return "bg-primary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      <div className="mobile-container py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Offers & Deals</h1>
            <p className="text-sm text-muted-foreground">Save more on every order</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">Premium</span>
          </div>
        </div>

        {/* Savings Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 text-center animate-fade-in">
            <div className="text-2xl font-bold text-primary">₹450</div>
            <div className="text-xs text-muted-foreground">Total Saved</div>
          </Card>
          <Card className="p-4 text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="text-2xl font-bold text-secondary">8</div>
            <div className="text-xs text-muted-foreground">Offers Used</div>
          </Card>
        </div>

        {/* Offer Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="active">
              Active ({offers.filter(o => o.status === "active").length})
            </TabsTrigger>
            <TabsTrigger value="used">
              Used ({offers.filter(o => o.status === "used").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {offers.filter(o => o.status === "active").map((offer, index) => (
              <Card key={offer.id} className="service-card hover-lift animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative overflow-hidden">
                  {/* Offer Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${getOfferColor(offer.category)} rounded-xl flex items-center justify-center text-white`}>
                        {getOfferIcon(offer.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{offer.title}</h3>
                        <p className="text-xs text-muted-foreground">{offer.description}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                      Active
                    </Badge>
                  </div>

                  {/* Offer Details */}
                  <div className="bg-gradient-primary text-white rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-2xl font-bold">{offer.discount}</div>
                        <div className="text-white/80 text-sm">
                          {offer.type === "percentage" ? "Discount" : "Cashback"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{offer.code}</div>
                        <div className="text-white/80 text-xs">Promo Code</div>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-full bg-white/20 text-white hover:bg-white/30 border-white/30"
                      onClick={() => handleCopyCode(offer.code)}
                    >
                      {copiedCode === offer.code ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Code
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Offer Conditions */}
                  <div className="bg-accent/20 rounded-lg p-3 mb-4">
                    <div className="space-y-2 text-sm">
                      {offer.minOrder && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Minimum Order</span>
                          <span className="font-medium">{offer.minOrder}</span>
                        </div>
                      )}
                      {offer.maxDiscount && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Max Discount</span>
                          <span className="font-medium">{offer.maxDiscount}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Valid Till</span>
                        <span className="font-medium">{offer.validTill}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">
                    Use This Offer
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="used" className="space-y-4">
            {offers.filter(o => o.status === "used").map((offer, index) => (
              <Card key={offer.id} className="service-card opacity-75 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${getOfferColor(offer.category)} rounded-xl flex items-center justify-center text-white opacity-60`}>
                      {getOfferIcon(offer.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{offer.title}</h3>
                      <p className="text-xs text-muted-foreground">{offer.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    Used
                  </Badge>
                </div>

                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Saved Amount</span>
                    <span className="font-bold text-green-600">{offer.discount}</span>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Referral CTA */}
        <Card className="service-card bg-gradient-primary text-white animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="text-center">
            <Users className="h-8 w-8 mx-auto mb-3 text-white/90" />
            <h3 className="font-bold text-lg mb-2">Refer Friends & Earn</h3>
            <p className="text-white/90 text-sm mb-4">
              Share your referral code and earn ₹100 for each friend who places their first order
            </p>
            <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-white/30">
              Share Referral Code
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Offers;