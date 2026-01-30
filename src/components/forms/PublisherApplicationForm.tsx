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

const publisherSchema = z.object({
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

type PublisherFormData = z.infer<typeof publisherSchema>;

interface PublisherApplicationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PublisherApplicationForm = ({
  open,
  onOpenChange,
}: PublisherApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PublisherFormData>({
    resolver: zodResolver(publisherSchema),
    defaultValues: {
      referral: "",
      website: "",
    },
  });

  const onSubmit = (data: PublisherFormData) => {
    setIsSubmitting(true);

    const subject = encodeURIComponent(`Publisher Application - ${data.companyName}`);
    const body = encodeURIComponent(
      `Publisher Application Details:\n\n` +
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
            Become a Publisher
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill out the form below to apply as a publisher. We'll review your application within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
          {/* Section: Contact Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Contact Information</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pub-name" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Full Name *
                </Label>
                <Input
                  id="pub-name"
                  placeholder="John Doe"
                  className="bg-background border-border focus:border-primary"
                  {...register("name")}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pub-companyName" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  Company Name *
                </Label>
                <Input
                  id="pub-companyName"
                  placeholder="Your Company LLC"
                  className="bg-background border-border focus:border-primary"
                  {...register("companyName")}
                />
                {errors.companyName && <p className="text-sm text-destructive">{errors.companyName.message}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pub-phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Phone Number *
                </Label>
                <Input
                  id="pub-phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="bg-background border-border focus:border-primary"
                  {...register("phone")}
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pub-email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email Address *
                </Label>
                <Input
                  id="pub-email"
                  type="email"
                  placeholder="you@company.com"
                  className="bg-background border-border focus:border-primary"
                  {...register("email")}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pub-address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Street Address *
              </Label>
              <Input
                id="pub-address"
                placeholder="123 Main Street, Suite 100"
                className="bg-background border-border focus:border-primary"
                {...register("address")}
              />
              {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pub-city">City *</Label>
                <Input id="pub-city" placeholder="New York" className="bg-background border-border focus:border-primary" {...register("city")} />
                {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pub-state">State *</Label>
                <Input id="pub-state" placeholder="NY" className="bg-background border-border focus:border-primary" {...register("state")} />
                {errors.state && <p className="text-sm text-destructive">{errors.state.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pub-region">Region *</Label>
                <Input id="pub-region" placeholder="North America" className="bg-background border-border focus:border-primary" {...register("region")} />
                {errors.region && <p className="text-sm text-destructive">{errors.region.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pub-zipcode">Zipcode *</Label>
                <Input id="pub-zipcode" placeholder="10001" className="bg-background border-border focus:border-primary" {...register("zipcode")} />
                {errors.zipcode && <p className="text-sm text-destructive">{errors.zipcode.message}</p>}
              </div>
            </div>
          </div>

          {/* Section: Business Details */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Business Details</h3>

            <div className="space-y-2">
              <Label htmlFor="pub-verticals">What verticals are you currently promoting? *</Label>
              <Textarea
                id="pub-verticals"
                placeholder="e.g., Finance, Health, Gaming, Sweepstakes..."
                className="bg-background border-border focus:border-primary min-h-[80px]"
                {...register("verticals")}
              />
              {errors.verticals && <p className="text-sm text-destructive">{errors.verticals.message}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pub-hearAboutUs">How did you hear about us? *</Label>
                <Input
                  id="pub-hearAboutUs"
                  placeholder="Google, Social Media, Event, etc."
                  className="bg-background border-border focus:border-primary"
                  {...register("hearAboutUs")}
                />
                {errors.hearAboutUs && <p className="text-sm text-destructive">{errors.hearAboutUs.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pub-referral">Did someone refer you? If so, who?</Label>
                <Input
                  id="pub-referral"
                  placeholder="Referrer's name (optional)"
                  className="bg-background border-border focus:border-primary"
                  {...register("referral")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pub-monthlyRevenue" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                Monthly revenue with other networks? *
              </Label>
              <Select onValueChange={(value) => setValue("monthlyRevenue", value)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select revenue range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="$0 - $10,000">$0 - $10,000</SelectItem>
                  <SelectItem value="$10,000 - $50,000">$10,000 - $50,000</SelectItem>
                  <SelectItem value="$50,000 - $100,000">$50,000 - $100,000</SelectItem>
                  <SelectItem value="$100,000 - $500,000">$100,000 - $500,000</SelectItem>
                  <SelectItem value="$500,000+">$500,000+</SelectItem>
                </SelectContent>
              </Select>
              {errors.monthlyRevenue && <p className="text-sm text-destructive">{errors.monthlyRevenue.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pub-bestOffers">What are your best current offers you're pushing? *</Label>
              <Textarea
                id="pub-bestOffers"
                placeholder="Describe your top performing offers..."
                className="bg-background border-border focus:border-primary min-h-[80px]"
                {...register("bestOffers")}
              />
              {errors.bestOffers && <p className="text-sm text-destructive">{errors.bestOffers.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pub-website" className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                Do you have a website? Please mention it below
              </Label>
              <Input
                id="pub-website"
                placeholder="https://yourwebsite.com (optional)"
                className="bg-background border-border focus:border-primary"
                {...register("website")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pub-trafficType" className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Traffic Type *
              </Label>
              <Select onValueChange={(value) => setValue("trafficType", value)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select traffic type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Incentive">Incentive</SelectItem>
                  <SelectItem value="Non-Incentive">Non-Incentive</SelectItem>
                  <SelectItem value="Both">Both (Incentive & Non-Incentive)</SelectItem>
                </SelectContent>
              </Select>
              {errors.trafficType && <p className="text-sm text-destructive">{errors.trafficType.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pub-promotionMethods">How do you promote offers? *</Label>
              <Textarea
                id="pub-promotionMethods"
                placeholder="e.g., Email, Social Media, Display, Push, Pop, Network, SEO..."
                className="bg-background border-border focus:border-primary min-h-[80px]"
                {...register("promotionMethods")}
              />
              {errors.promotionMethods && <p className="text-sm text-destructive">{errors.promotionMethods.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
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
