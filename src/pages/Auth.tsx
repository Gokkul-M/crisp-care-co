import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Phone, MessageCircle, Mail } from "lucide-react";

const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Redirect to role selection
      window.location.href = '/role-selection';
    }, 1500);
  };

  const handleGoogleLogin = () => {
    // Simulate Google login
    setTimeout(() => {
      window.location.href = '/role-selection';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="mobile-container py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => window.location.href = '/'}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Welcome Back</h1>
        </div>

        <Card className="service-card animate-fade-in">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-lg font-medium mb-2">Sign in to your account</h2>
                <p className="text-sm text-muted-foreground">
                  Enter your phone number to continue
                </p>
              </div>

              {!otpSent ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mobile-input pl-11"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSendOtp}
                    disabled={!phoneNumber || loading}
                    className="service-button"
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 animate-slide-up">
                  <div className="text-center mb-4">
                    <MessageCircle className="h-12 w-12 mx-auto text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">
                      We sent a verification code to<br />
                      <span className="font-medium text-foreground">{phoneNumber}</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="mobile-input text-center text-lg tracking-widest"
                      maxLength={6}
                    />
                  </div>

                  <Button
                    onClick={handleVerifyOtp}
                    disabled={otp.length !== 6 || loading}
                    className="service-button"
                  >
                    {loading ? "Verifying..." : "Verify & Continue"}
                  </Button>

                  <div className="text-center">
                    <Button
                      variant="link"
                      onClick={() => setOtpSent(false)}
                      className="text-sm text-muted-foreground"
                    >
                      Change phone number
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="signup" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-lg font-medium mb-2">Create your account</h2>
                <p className="text-sm text-muted-foreground">
                  Join thousands of satisfied customers
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="mobile-input pl-11"
                    />
                  </div>
                </div>

                <Button className="service-button">
                  Create Account
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-3 text-xs text-muted-foreground">OR</span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          {/* Google Sign In */}
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full py-3 border-border hover:bg-accent transition-colors"
          >
            <Mail className="h-5 w-5 mr-2" />
            Continue with Google
          </Button>
        </Card>

        {/* Terms */}
        <p className="text-xs text-muted-foreground text-center mt-6 leading-relaxed">
          By continuing, you agree to our{" "}
          <Button variant="link" className="p-0 text-xs text-primary">
            Terms of Service
          </Button>
          {" "}and{" "}
          <Button variant="link" className="p-0 text-xs text-primary">
            Privacy Policy
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Auth;