import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Building2, User, Phone, Mail, MapPin, Globe, DollarSign, Users } from "lucide-react";
import { DESTINATION_EMAIL } from "@/config/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const advertiserSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  companyName: z.string().trim().min(2, "Company name must be at least 2 characters").max(100),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  address: z.string().trim().min(5, "Please enter your address").max(200),
  city: z.string().trim().min(2, "Please enter your city").max(100),
  state: z.string().trim().min(2, "Please enter your state").max(100),
  region: z.string().trim().min(2, "Please enter your region").max(100),
  zipcode: z.string().trim().min(3, "Please enter your zipcode").max(20),
  verticals: z.string().trim().min(2, "Please specify your verticals").max(500),
  hearAboutUs: z.string().trim().min(2, "Please let us know how you heard about us").max(200),
  referral: z.string().trim().max(200).optional(),
  monthlyRevenue: z.string().trim().min(1, "Please select your revenue range"),
  bestOffers: z.string().trim().min(5, "Please describe your best offers").max(500),
  website: z.string().trim().max(200).optional(),
  trafficType: z.string().trim().min(1, "Please select traffic type"),
  promotionMethods: z.string().trim().min(2, "Please describe your promotion methods").max(500),
});

type AdvertiserFormData = z.infer<typeof advertiserSchema>;

interface AdvertiserApplicationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AdvertiserApplicationForm = ({
  open,
  onOpenChange,
}: AdvertiserApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AdvertiserFormData>({
    resolver: zodResolver(advertiserSchema),
    defaultValues: {
      referral: "",
      website: "",
    },
  });

  const onSubmit = (data: AdvertiserFormData) => {
    setIsSubmitting(true);

    const subject = encodeURIComponent(`Advertiser Application - ${data.companyName}`);
    const body = encodeURIComponent(
      `Advertiser Application Details:\n\n` +
      `=== CONTACT INFORMATION ===\n` +
      `Name: ${data.name}\n` +
      `Company Name: ${data.companyName}\n` +
      `Phone: ${data.phone}\n` +
      `Email: ${data.email}\n` +
      `Address: ${data.address}\n` +
      `City: ${data.city}\n` +
      `State: ${data.state}\n` +
      `Region: ${data.region}\n` +
      `Zipcode: ${data.zipcode}\n\n` +
      `=== BUSINESS DETAILS ===\n` +
      `Verticals Currently Promoting: ${data.verticals}\n` +
      `How did you hear about us: ${data.hearAboutUs}\n` +
      `Referral (if any): ${data.referral || "N/A"}\n` +
      `Monthly Revenue with other networks: ${data.monthlyRevenue}\n` +
      `Best Current Offers: ${data.bestOffers}\n` +
      `Website: ${data.website || "N/A"}\n` +
      `Traffic Type: ${data.trafficType}\n` +
      `Promotion Methods: ${data.promotionMethods}\n\n` +
      `---\nSubmitted via Boom Affiliates Website`
    );

    const mailtoLink = `mailto:${DESTINATION_EMAIL}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

    toast({
      title: "Opening Email Client",
      description: "Your email client will open with the application details.",
    });

    setIsSubmitting(false);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            Become an Advertiser
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill out the form below to apply as an advertiser. We'll review your application within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
          {/* Section: Contact Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Contact Information</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="bg-background border-border focus:border-primary"
                  {...register("name")}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  Company Name *
                </Label>
                <Input
                  id="companyName"
                  placeholder="Your Company LLC"
                  className="bg-background border-border focus:border-primary"
                  {...register("companyName")}
                />
                {errors.companyName && <p className="text-sm text-destructive">{errors.companyName.message}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="bg-background border-border focus:border-primary"
                  {...register("phone")}
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="bg-background border-border focus:border-primary"
                  {...register("email")}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Street Address *
              </Label>
              <Input
                id="address"
                placeholder="123 Main Street, Suite 100"
                className="bg-background border-border focus:border-primary"
                {...register("address")}
              />
              {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input id="city" placeholder="New York" className="bg-background border-border focus:border-primary" {...register("city")} />
                {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input id="state" placeholder="NY" className="bg-background border-border focus:border-primary" {...register("state")} />
                {errors.state && <p className="text-sm text-destructive">{errors.state.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Region *</Label>
                <Input id="region" placeholder="North America" className="bg-background border-border focus:border-primary" {...register("region")} />
                {errors.region && <p className="text-sm text-destructive">{errors.region.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipcode">Zipcode *</Label>
                <Input id="zipcode" placeholder="10001" className="bg-background border-border focus:border-primary" {...register("zipcode")} />
                {errors.zipcode && <p className="text-sm text-destructive">{errors.zipcode.message}</p>}
              </div>
            </div>
          </div>

          

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="hero" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Sending..." : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
