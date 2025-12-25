import { Link } from "react-router-dom";
import { ArrowRight, Warehouse, Shield, Clock, Truck, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Warehouse,
    title: "Đa dạng loại kho",
    description: "Kho thường, kho lạnh, kho ngoại quan đáp ứng mọi nhu cầu lưu trữ.",
  },
  {
    icon: Shield,
    title: "An ninh 24/7",
    description: "Hệ thống camera giám sát, bảo vệ và kiểm soát ra vào nghiêm ngặt.",
  },
  {
    icon: Clock,
    title: "Linh hoạt thời gian",
    description: "Thuê theo ngày, tháng hoặc năm. Dễ dàng gia hạn hoặc thu hẹp.",
  },
  {
    icon: Truck,
    title: "Vị trí thuận tiện",
    description: "Gần cảng biển, sân bay và trục đường giao thông chính.",
  },
];

const stats = [
  { value: "50+", label: "Kho trên toàn quốc" },
  { value: "1000+", label: "Khách hàng tin tưởng" },
  { value: "500,000m²", label: "Diện tích cho thuê" },
  { value: "99.9%", label: "Tỷ lệ hài lòng" },
];

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-body-sm">
              <Star className="h-4 w-4" />
              <span>Giải pháp kho bãi #1 Việt Nam</span>
            </div>
            <h1 className="text-display">
              Cho thuê kho bãi{" "}
              <span className="text-primary">chuyên nghiệp</span>
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              GenHub cung cấp giải pháp lưu trữ linh hoạt với hệ thống kho hiện đại, 
              an ninh 24/7 và dịch vụ hỗ trợ tận tâm cho mọi doanh nghiệp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link to="/warehouses">
                  Tìm kho ngay
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Liên hệ tư vấn</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-stat-lg">{stat.value}</div>
                <div className="text-body-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-xl mb-4">Tại sao chọn GenHub?</h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến trải nghiệm thuê kho tốt nhất với dịch vụ chuyên nghiệp và giá cả hợp lý.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="card-interactive">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-heading-sm mb-2">{feature.title}</h3>
                  <p className="text-body-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-heading-xl">Sẵn sàng tìm kho phù hợp?</h2>
            <p className="text-body text-muted-foreground">
              Đăng ký ngay để nhận tư vấn miễn phí và báo giá chi tiết từ đội ngũ chuyên gia của chúng tôi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">Đăng ký miễn phí</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/pricing">Xem bảng giá</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-heading-xl">Quy trình thuê kho đơn giản</h2>
              <p className="text-body text-muted-foreground">
                Chỉ với vài bước đơn giản, bạn có thể tìm và thuê kho phù hợp với nhu cầu của mình.
              </p>
              <div className="space-y-4">
                {[
                  "Tìm kiếm kho theo vị trí, diện tích, giá cả",
                  "Xem chi tiết và đặt lịch tham quan",
                  "Ký hợp đồng online nhanh chóng",
                  "Thanh toán an toàn và nhận bàn giao kho",
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-body">{step}</span>
                  </div>
                ))}
              </div>
              <Button asChild>
                <Link to="/warehouses">Bắt đầu tìm kho</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Warehouse className="h-24 w-24 text-primary/50" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
