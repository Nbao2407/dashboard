import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Warehouse, 
  Shield, 
  Clock, 
  Truck, 
  CheckCircle, 
  MapPin,
  Lock,
  Eye,
  Package,
  Search,
  BadgeCheck,
  Headphones
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const securityFeatures = [
  {
    icon: Lock,
    title: "Bảo mật đa lớp",
    description: "Hệ thống khóa điện tử, kiểm soát truy cập bằng sinh trắc học.",
  },
  {
    icon: Eye,
    title: "Giám sát 24/7",
    description: "Camera AI phát hiện bất thường, đội ngũ bảo vệ chuyên nghiệp.",
  },
  {
    icon: Shield,
    title: "Bảo hiểm toàn diện",
    description: "Đền bù 100% giá trị hàng hóa khi có sự cố.",
  },
];

const services = [
  {
    icon: Warehouse,
    title: "Kho thường",
    description: "Lưu trữ hàng hóa khô, thiết bị, vật liệu xây dựng.",
    tag: "Phổ biến",
  },
  {
    icon: Package,
    title: "Kho lạnh",
    description: "Bảo quản thực phẩm, dược phẩm ở nhiệt độ chuẩn.",
    tag: "Chuyên biệt",
  },
  {
    icon: Truck,
    title: "Fulfillment",
    description: "Đóng gói, vận chuyển, quản lý đơn hàng trọn gói.",
    tag: "Mới",
  },
];

const stats = [
  { value: "50+", label: "Kho trên toàn quốc" },
  { value: "99.9%", label: "Độ an toàn" },
  { value: "500,000m²", label: "Diện tích" },
  { value: "24/7", label: "Hỗ trợ" },
];

const trustBadges = [
  "ISO 9001:2015",
  "ISO 14001",
  "OHSAS 18001",
];

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Clean, Security-focused */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border-subtle))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border-subtle))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Trust indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success border border-success/20">
              <BadgeCheck className="h-4 w-4" />
              <span className="text-body-sm font-medium">Được chứng nhận ISO 9001:2015</span>
            </div>
            
            <h1 className="text-display leading-tight">
              Logistics{" "}
              <span className="text-primary">an toàn</span>
              <br />
              <span className="text-text-secondary">chất lượng hàng đầu</span>
            </h1>
            
            <p className="text-body-lg text-text-tertiary max-w-2xl mx-auto">
              GenHub cam kết bảo vệ hàng hóa của bạn với hệ thống kho hiện đại, 
              giám sát 24/7 và quy trình vận hành chuẩn quốc tế.
            </p>

            {/* Tracking Input - Key Feature */}
            <div className="max-w-lg mx-auto pt-4">
              <div className="flex gap-2 p-2 rounded-xl bg-bg-elevated border border-border-subtle shadow-elevated">
                <div className="flex-1 flex items-center gap-2 px-3">
                  <Search className="h-5 w-5 text-text-tertiary" />
                  <Input 
                    placeholder="Nhập mã vận đơn để theo dõi..." 
                    className="border-0 bg-transparent focus-visible:ring-0 text-body"
                  />
                </div>
                <Button size="lg">
                  Tra cứu
                </Button>
              </div>
              <p className="text-caption text-text-tertiary mt-3">
                Theo dõi đơn hàng real-time • Nhận thông báo tự động
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link to="/warehouses">
                  Tìm kho phù hợp
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">
                  <Headphones className="mr-2 h-4 w-4" />
                  Tư vấn miễn phí
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar - Minimal */}
      <section className="py-8 border-y border-border-subtle bg-bg-elevated">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-stat-lg text-primary">{stat.value}</div>
                <div className="text-body-sm text-text-tertiary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section - Key Differentiator */}
      <section className="py-20 bg-bg-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <Shield className="h-5 w-5" />
              <span className="text-subtitle font-medium">An ninh & Bảo mật</span>
            </div>
            <h2 className="text-heading-xl mb-4">
              Hàng hóa của bạn được bảo vệ tuyệt đối
            </h2>
            <p className="text-body text-text-tertiary">
              Hệ thống an ninh đa lớp kết hợp công nghệ AI đảm bảo an toàn 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {securityFeatures.map((feature) => (
              <Card key={feature.title} className="bg-bg border-border-subtle hover:border-primary/30 transition-colors">
                <CardContent className="pt-6 text-center">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-heading-sm mb-2">{feature.title}</h3>
                  <p className="text-body-sm text-text-tertiary">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {trustBadges.map((badge) => (
              <div 
                key={badge}
                className="px-4 py-2 rounded-full border border-border-subtle bg-bg text-body-sm text-text-secondary"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-heading-xl mb-4">Dịch vụ nổi bật</h2>
            <p className="text-body text-text-tertiary">
              Giải pháp lưu trữ đa dạng cho mọi nhu cầu kinh doanh.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service) => (
              <Card key={service.title} className="group card-interactive relative overflow-hidden">
                <CardContent className="pt-6">
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 rounded text-caption bg-accent/10 text-accent font-medium">
                      {service.tag}
                    </span>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-bg-subtle flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <service.icon className="h-6 w-6 text-text-secondary group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-heading-sm mb-2">{service.title}</h3>
                  <p className="text-body-sm text-text-tertiary mb-4">{service.description}</p>
                  <Link 
                    to="/warehouses" 
                    className="inline-flex items-center text-body-sm text-primary hover:underline"
                  >
                    Tìm hiểu thêm
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Simple Steps */}
      <section className="py-20 bg-bg-elevated border-y border-border-subtle">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <div>
                <h2 className="text-heading-xl mb-4">Quy trình đơn giản</h2>
                <p className="text-body text-text-tertiary">
                  Chỉ 4 bước để bắt đầu sử dụng dịch vụ kho bãi chuyên nghiệp.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { step: "01", title: "Tìm kiếm", desc: "Lọc kho theo vị trí, diện tích phù hợp" },
                  { step: "02", title: "Tham quan", desc: "Đặt lịch xem kho trực tiếp hoặc qua video" },
                  { step: "03", title: "Ký kết", desc: "Hợp đồng điện tử nhanh chóng, minh bạch" },
                  { step: "04", title: "Sử dụng", desc: "Bàn giao kho và bắt đầu vận hành" },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="text-stat text-primary/20 font-bold leading-none">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-subtitle mb-1">{item.title}</h4>
                      <p className="text-body-sm text-text-tertiary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button size="lg" asChild>
                <Link to="/warehouses">
                  Bắt đầu ngay
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Visual element */}
            <div className="relative hidden lg:block">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border-subtle flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <MapPin className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <div className="text-heading-lg">50+</div>
                    <div className="text-body-sm text-text-tertiary">Kho trên toàn quốc</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Clean */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-heading-xl">Sẵn sàng bắt đầu?</h2>
            <p className="text-body text-text-tertiary">
              Liên hệ ngay để nhận tư vấn miễn phí từ đội ngũ chuyên gia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">Đăng ký tài khoản</Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link to="/pricing">Xem bảng giá →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
