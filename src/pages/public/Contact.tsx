import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: MapPin,
    title: "Địa chỉ",
    content: "123 Nguyễn Văn Linh, Quận 7, TP.HCM",
  },
  {
    icon: Phone,
    title: "Hotline",
    content: "1900 1234 56",
  },
  {
    icon: Mail,
    title: "Email",
    content: "contact@genhub.vn",
  },
  {
    icon: Clock,
    title: "Giờ làm việc",
    content: "T2 - T7: 8:00 - 18:00",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Gửi thành công!",
      description: "Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-display-sm">Liên hệ với chúng tôi</h1>
            <p className="text-body-lg text-muted-foreground">
              Đội ngũ tư vấn sẵn sàng hỗ trợ bạn tìm giải pháp kho bãi phù hợp nhất
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-heading-lg">Thông tin liên hệ</h2>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <Card key={info.title}>
                    <CardContent className="flex items-start gap-4 p-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-subtitle-sm">{info.title}</h3>
                        <p className="text-body-sm text-muted-foreground">{info.content}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-body-sm">Bản đồ vị trí</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-heading-lg mb-6">Gửi yêu cầu tư vấn</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Họ và tên *</Label>
                        <Input
                          id="name"
                          placeholder="Nhập họ và tên"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Số điện thoại *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="0912 345 678"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Chủ đề</Label>
                        <Select 
                          value={formData.subject} 
                          onValueChange={(value) => setFormData({ ...formData, subject: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn chủ đề" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rent">Thuê kho mới</SelectItem>
                            <SelectItem value="quote">Yêu cầu báo giá</SelectItem>
                            <SelectItem value="visit">Đặt lịch tham quan</SelectItem>
                            <SelectItem value="support">Hỗ trợ kỹ thuật</SelectItem>
                            <SelectItem value="other">Khác</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Nội dung *</Label>
                      <Textarea
                        id="message"
                        placeholder="Mô tả nhu cầu của bạn..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Đang gửi..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Gửi yêu cầu
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-heading-xl text-center mb-8">Chi nhánh trên toàn quốc</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                city: "TP. Hồ Chí Minh",
                address: "123 Nguyễn Văn Linh, Quận 7",
                phone: "028 1234 5678",
              },
              {
                city: "Hà Nội",
                address: "456 Lê Văn Lương, Thanh Xuân",
                phone: "024 1234 5678",
              },
              {
                city: "Đà Nẵng",
                address: "789 Nguyễn Hữu Thọ, Liên Chiểu",
                phone: "0236 1234 5678",
              },
            ].map((branch) => (
              <Card key={branch.city}>
                <CardContent className="p-6">
                  <h3 className="text-heading-sm mb-3">{branch.city}</h3>
                  <div className="space-y-2 text-body-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0" />
                      <span>{branch.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
