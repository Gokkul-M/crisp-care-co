import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Clock, Shield, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-laundry.jpg";

const Welcome = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Clock,
      title: "Same Day Service",
      description: "Get your clothes cleaned and returned the same day"
    },
    {
      icon: MapPin,
      title: "Doorstep Pickup",
      description: "We collect and deliver right to your door"
    },
    {
      icon: Shield,
      title: "Premium Care",
      description: "Professional cleaning with fabric protection"
    },
    {
      icon: Sparkles,
      title: "Quality Guaranteed",
      description: "100% satisfaction guaranteed or your money back"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="mobile-container py-8">
        {/* Hero Section */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
        }`}>
          {/* Hero Image */}
          <div className="mb-6 relative">
            <img 
              src={heroImage} 
              alt="Professional laundry service" 
              className="w-full h-48 object-cover rounded-2xl shadow-soft"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
          </div>
          
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-primary rounded-2xl flex items-center justify-center mb-4 animate-bounce-in">
              <Sparkles className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              CleanCare
            </h1>
            <p className="text-lg text-muted-foreground">
              Premium Laundry Service
            </p>
          </div>
          
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Experience the convenience of professional laundry services with pickup and delivery right to your doorstep.
          </p>
        </div>

        {/* Features Grid */}
        <div className={`grid grid-cols-2 gap-4 mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
        }`}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title}
                className={`service-card text-center transition-all duration-500 hover-lift`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className={`space-y-4 transition-all duration-1000 delay-500 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          <Button 
            className="service-button"
            onClick={() => window.location.href = '/auth'}
          >
            Get Started
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 text-primary font-medium"
                onClick={() => window.location.href = '/auth?mode=login'}
              >
                Sign In
              </Button>
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`mt-12 text-center transition-all duration-1000 delay-700 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          <div className="flex items-center justify-center space-x-6 text-muted-foreground">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">1000+</div>
              <div className="text-xs">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-xs">Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-xs">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;