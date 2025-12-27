import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Warehouse, 
  Shield, 
  Clock, 
  MapPin,
  Lock,
  Eye,
  Search,
  BadgeCheck,
  Headphones,
  Ruler,
  ThermometerSun,
  Key
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const securityFeatures = [
  {
    icon: Lock,
    title: "Khóa thông minh",
    description: "Hệ thống khóa điện tử, kiểm soát ra vào bằng thẻ từ/vân tay.",
  },
  {
    icon: Eye,
    title: "Camera 24/7",
    description: "Hệ thống camera giám sát toàn bộ khu vực kho.",
  },
  {
    icon: Shield,
    title: "Bảo vệ trực",
    description: "Đội ngũ bảo vệ chuyên nghiệp túc trực 24/7.",
  },
];

const warehouseTypes = [
  {
    icon: Warehouse,
    title: "Kho nhỏ",
    size: "20 - 50 m²",
    description: "Phù hợp hộ kinh doanh, lưu trữ hàng hóa nhỏ lẻ.",
    price: "Từ 80.000đ/m²",
  },
  {
    icon: Ruler,
    title: "Kho vừa",
    size: "50 - 200 m²",
    description: "Dành cho doanh nghiệp nhỏ, kho hàng bán buôn.",
    price: "Từ 65.000đ/m²",
  },
  {
    icon: ThermometerSun,
    title: "Kho lớn",
    size: "200 - 1000 m²",
    description: "Kho xưởng sản xuất, trung tâm phân phối.",
    price: "Từ 50.000đ/m²",
  },
];

const stats = [
  { value: "50+", label: "Kho cho thuê" },
  { value: "99%", label: "Khách hài lòng" },
  { value: "500,000m²", label: "Tổng diện tích" },
  { value: "24/7", label: "Hỗ trợ" },
];

const benefits = [
  "Không cần đặt cọc nhiều tháng",
  "Linh hoạt thời gian thuê",
  "Miễn phí tham quan kho",
  "Hỗ trợ pháp lý hợp đồng",
];

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border-subtle))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border-subtle))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Trust indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success border border-success/20">
              <BadgeCheck className="h-4 w-4" />
              <span className="text-body-sm font-medium">Uy tín #1 thị trường cho thuê kho</span>
            </div>
            
            <h1 className="text-display leading-tight">
              Thuê kho{" "}
              <span className="text-primary">đơn giản</span>
              <br />
              <span className="text-text-secondary">giá cả minh bạch</span>
            </h1>
            
            <p className="text-body-lg text-text-tertiary max-w-2xl mx-auto">
              GenHub cung cấp dịch vụ cho thuê kho bãi với đa dạng diện tích, 
              vị trí thuận tiện và chi phí hợp lý cho mọi nhu cầu kinh doanh.
            </p>

            {/* Search Input */}
            <div className="max-w-lg mx-auto pt-4">
              <div className="flex gap-2 p-2 rounded-xl bg-bg-elevated border border-border-subtle shadow-elevated">
                <div className="flex-1 flex items-center gap-2 px-3">
                  <Search className="h-5 w-5 text-text-tertiary" />
                  <Input 
                    placeholder="Tìm kho theo khu vực, diện tích..." 
                    className="border-0 bg-transparent focus-visible:ring-0 text-body"
                  />
                </div>
                <Button size="lg">
                  Tìm kho
                </Button>
              </div>
              <p className="text-caption text-text-tertiary mt-3">
                Tìm kho nhanh • So sánh giá • Đặt lịch xem kho miễn phí
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link to="/warehouses">
                  Xem danh sách kho
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

      {/* Stats Bar */}
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

      {/* Warehouse Types Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <Key className="h-5 w-5" />
              <span className="text-subtitle font-medium">Loại hình kho</span>
            </div>
            <h2 className="text-heading-xl mb-4">Đa dạng diện tích cho thuê</h2>
            <p className="text-body text-text-tertiary">
              Từ kho nhỏ cho hộ kinh doanh đến kho lớn cho doanh nghiệp.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {warehouseTypes.map((type) => (
              <Card key={type.title} className="group card-interactive relative overflow-hidden">
                <CardContent className="pt-6">
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 rounded text-caption bg-primary/10 text-primary font-medium">
                      {type.size}
                    </span>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-bg-subtle flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <type.icon className="h-6 w-6 text-text-secondary group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-heading-sm mb-2">{type.title}</h3>
                  <p className="text-body-sm text-text-tertiary mb-3">{type.description}</p>
                  <div className="text-subtitle text-primary">{type.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/pricing">
                Xem bảng giá chi tiết
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-bg-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <Shield className="h-5 w-5" />
              <span className="text-subtitle font-medium">An ninh kho bãi</span>
            </div>
            <h2 className="text-heading-xl mb-4">
              Hàng hóa được bảo vệ an toàn
            </h2>
            <p className="text-body text-text-tertiary">
              Hệ thống an ninh đa lớp đảm bảo an toàn cho hàng hóa của bạn.
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
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-bg-elevated border-y border-border-subtle">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <div>
                <h2 className="text-heading-xl mb-4">Thuê kho chỉ 4 bước</h2>
                <p className="text-body text-text-tertiary">
                  Quy trình đơn giản, nhanh chóng, không rườm rà.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { step: "01", title: "Tìm kho", desc: "Chọn vị trí và diện tích phù hợp nhu cầu" },
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

            {/* Benefits list */}
            <div className="relative hidden lg:block">
              <div className="rounded-2xl bg-bg border border-border-subtle p-8 space-y-6">
                <h3 className="text-heading-sm">Ưu điểm khi thuê kho tại GenHub</h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                        <BadgeCheck className="h-4 w-4 text-success" />
                      </div>
                      <span className="text-body">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-border-subtle">
                  <div className="flex items-center gap-3">
                    <Warehouse className="h-8 w-8 text-primary" />
                    <div>
                      <div className="text-heading-lg text-primary">50+</div>
                      <div className="text-caption text-text-tertiary">Kho cho thuê toàn quốc</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-heading-xl">Bắt đầu thuê kho ngay hôm nay</h2>
            <p className="text-body text-text-tertiary">
              Đăng ký miễn phí để xem chi tiết các kho và nhận báo giá.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">Đăng ký miễn phí</Link>
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
