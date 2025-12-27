import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Warehouse, 
  Play,
  RefreshCw,
  Unlock,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import warehouseHero from "@/assets/warehouse-hero.jpg";

const features = [
  {
    icon: Building2,
    label: "Chi tiết từng kho",
  },
  {
    icon: RefreshCw,
    label: "Cập nhật hàng ngày",
  },
  {
    icon: Unlock,
    label: "Truy cập không giới hạn",
  },
];

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section - With Bordered Image */}
      <section className="py-6 lg:py-8">
        <div className="container mx-auto px-4">
          <div className="relative min-h-[550px] lg:min-h-[650px] rounded-2xl overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src={warehouseHero} 
                alt="Kho bãi cho thuê" 
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full px-6 lg:px-12 flex flex-col justify-center min-h-[550px] lg:min-h-[650px] py-12">
              {/* Main Heading */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8 max-w-2xl">
                Kho bãi cho thuê
                <br />
                tại Việt Nam — lưu trữ an toàn
                <br />
                <span className="text-white/90">
                  đồ đạc, hàng hóa từ 1 m²
                </span>
              </h1>

              {/* Video Play Button - positioned to the right */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex">
                <button className="group flex items-center justify-center h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all">
                  <Play className="h-8 w-8 text-white fill-white ml-1" />
                </button>
              </div>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                {features.map((feature) => (
                  <div 
                    key={feature.label}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white"
                  >
                    <feature.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{feature.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto min-w-[300px] h-14 text-base font-semibold rounded-lg bg-primary hover:bg-primary/90"
                  asChild
                >
                  <Link to="/warehouses">
                    Chọn kho ngay
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-12 bg-bg-elevated border-b border-border-subtle">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Kho cho thuê" },
              { value: "99%", label: "Khách hài lòng" },
              { value: "500,000", label: "m² diện tích" },
              { value: "24/7", label: "Hỗ trợ" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-text-tertiary mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warehouse Types */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Đa dạng loại hình kho</h2>
            <p className="text-text-tertiary max-w-2xl mx-auto">
              Từ kho nhỏ cho hộ kinh doanh đến kho lớn cho doanh nghiệp
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Kho nhỏ", size: "20-50 m²", price: "Từ 80.000đ/m²" },
              { title: "Kho vừa", size: "50-200 m²", price: "Từ 65.000đ/m²" },
              { title: "Kho lớn", size: "200-1000 m²", price: "Từ 50.000đ/m²" },
            ].map((type) => (
              <div 
                key={type.title}
                className="group p-6 rounded-xl border border-border bg-bg-elevated hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Warehouse className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{type.title}</h3>
                <p className="text-sm text-text-tertiary mb-3">{type.size}</p>
                <div className="text-primary font-semibold">{type.price}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/pricing">
                Xem bảng giá chi tiết
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
            Bắt đầu thuê kho ngay hôm nay
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Đăng ký miễn phí để xem chi tiết các kho và nhận báo giá tốt nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">Đăng ký miễn phí</Link>
            </Button>
            <Button size="lg" variant="ghost" className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/contact">Liên hệ tư vấn →</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
