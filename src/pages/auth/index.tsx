import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Phone, MessageCircle, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OtpInput from "@/components/ui/OtpInput";
import { toast } from "sonner";

const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const navigate = useNavigate();

  // Signup state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleSendOtp = async (phone: string) => {
    if (!phone) {
        toast.error("Please enter a phone number.");
        return;
    }
    setPhoneNumber(phone);
    setLoading(true);
    setTimeout(() => {
      console.log(`Mock OTP for ${phone}: 123456`);
      setOtpSent(true);
      setLoading(false);
      setResendCooldown(30);
    }, 1500);
  };

  const handleSignupSubmit = () => {
    if (!fullName || !email || !signupPhone) {
        toast.error("Please fill in all fields.");
        return;
    }
    handleSendOtp(signupPhone);
  }

  const handleResendOtp = () => {
    setOtp("");
    setResendCooldown(30);
    console.log(`Resending OTP to ${phoneNumber}...`);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setTimeout(() => {
      if (otp === "123456") {
        toast.success("Verification successful!")
        navigate('/profile-setup');
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
      setLoading(false);
    }, 1500);
  };
  
  const handleGoogleLogin = () => {
    setTimeout(() => {
      navigate('/profile-setup');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="mobile-container py-8">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => otpSent ? setOtpSent(false) : navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Welcome</h1>
        </div>

        <Card className="service-card animate-fade-in p-6">
          {!otpSent ? (
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-lg font-medium">Sign in to your account</h2>
                    <p className="text-sm text-muted-foreground">
                      Enter your phone number to continue
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="mobile-input pl-11" />
                      </div>
                    </div>
                    <Button onClick={() => handleSendOtp(phoneNumber)} disabled={!phoneNumber || loading} className="service-button">
                      {loading ? "Sending..." : "Send OTP"}
                    </Button>
                  </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-6">
                <div className="text-center">
                  <h2 className="text-lg font-medium">Create your account</h2>
                  <p className="text-sm text-muted-foreground">
                    Join thousands of satisfied customers
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input id="signup-name" placeholder="John Doe" value={fullName} onChange={e => setFullName(e.target.value)} className="mobile-input pl-11" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input id="signup-email" type="email" placeholder="john.doe@example.com" value={email} onChange={e => setEmail(e.target.value)} className="mobile-input pl-11" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input id="signup-phone" type="tel" placeholder="+1 (555) 123-4567" value={signupPhone} onChange={e => setSignupPhone(e.target.value)} className="mobile-input pl-11" />
                    </div>
                  </div>
                  <Button onClick={handleSignupSubmit} disabled={loading} className="service-button">
                    {loading ? "Sending..." : "Send OTP"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="space-y-6 animate-slide-up">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 mx-auto text-primary mb-3" />
                <h2 className="text-lg font-medium">Enter Verification Code</h2>
                <p className="text-sm text-muted-foreground">
                  We sent a code to{" "}
                  <span className="font-medium text-foreground">{phoneNumber}</span>
                </p>
              </div>
              <div className="space-y-4">
                  <OtpInput length={6} onComplete={setOtp} />
                <Button onClick={handleVerifyOtp} disabled={otp.length !== 6 || loading} className="service-button">
                  {loading ? "Verifying..." : "Verify & Continue"}
                </Button>
                <div className="text-center text-sm">
                  <p className="text-muted-foreground">
                    Didn't receive the code?{" "}
                    <Button variant="link" onClick={handleResendOtp} disabled={resendCooldown > 0} className="p-0 h-auto text-primary disabled:text-muted-foreground disabled:no-underline">
                      {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-3 text-xs text-muted-foreground">OR</span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          <Button variant="outline" onClick={handleGoogleLogin} className="w-full py-3 border-border hover:bg-accent transition-colors">
            <Mail className="h-5 w-5 mr-2" />
            Continue with Google
          </Button>
        </Card>

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
