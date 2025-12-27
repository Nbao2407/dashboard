import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Warehouse, 
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import warehouseHero from "@/assets/warehouse-hero.jpg";

const goodsTypes = [
  "Hàng tiêu dùng",
  "Hàng điện tử",
  "Hàng thực phẩm",
  "Hàng may mặc",
  "Hàng nội thất",
  "Nguyên vật liệu",
  "Khác",
];

const Home = () => {
  const [goodsType, setGoodsType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isFormExpanded, setIsFormExpanded] = useState(true);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-6 lg:py-8">
        <div className="container mx-auto px-4">
          <div className="relative min-h-[500px] lg:min-h-[550px] rounded-2xl overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src={warehouseHero} 
                alt="Kho hàng thông minh" 
                className="w-full h-full object-cover"
              />
              {/* Light Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full px-6 lg:px-12 flex flex-col justify-center min-h-[500px] lg:min-h-[550px] py-12">
              {/* Headline */}
              <div className="max-w-2xl mb-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-white">Kho hàng thông minh.</span>
                  <br />
                  <span className="text-white/90">Tối ưu lợi nhuận.</span>
                </h1>
                <p className="mt-6 text-lg text-white/80 max-w-md">
                  Giải pháp lưu trữ hiện đại với công nghệ quản lý tiên tiến
                </p>
              </div>

              {/* Horizontal Quote Form */}
              <div className="w-full max-w-4xl">
                <div className="bg-background rounded-xl shadow-elevated overflow-hidden">
                  {/* Form Header - Clickable to expand/collapse */}
                  <button
                    onClick={() => setIsFormExpanded(!isFormExpanded)}
                    className="w-full flex items-center justify-between p-4 lg:px-6 hover:bg-muted/50 transition-colors"
                  >
                    <h2 className="text-lg font-semibold text-foreground">
                      Tính nhanh phí lưu kho
                    </h2>
                    <ChevronDown 
                      className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                        isFormExpanded ? "rotate-180" : ""
                      }`} 
                    />
                  </button>

                  {/* Form Content - Expandable with animation */}
                  <div 
                    className={`grid transition-all duration-300 ease-out ${
                      isFormExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 lg:px-6 pb-4 lg:pb-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-end">
                          {/* Goods Type Dropdown */}
                          <div className="flex-1 w-full">
                            <label className="block text-sm font-medium text-muted-foreground mb-2">
                              Loại hàng hóa
                            </label>
                            <Select value={goodsType} onValueChange={setGoodsType}>
                              <SelectTrigger className="w-full h-12 bg-background border-border">
                                <SelectValue placeholder="Chọn loại hàng hóa" />
                              </SelectTrigger>
                              <SelectContent className="bg-background border-border z-50">
                                {goodsTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Quantity Input */}
                          <div className="flex-1 w-full">
                            <label className="block text-sm font-medium text-muted-foreground mb-2">
                              Số lượng dự kiến (m³)
                            </label>
                            <Input
                              type="number"
                              placeholder="Nhập số lượng"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                              className="h-12 bg-background border-border"
                            />
                          </div>

                          {/* Submit Button - Orange */}
                          <div className="w-full lg:w-auto">
                            <Button 
                              size="lg"
                              className="w-full lg:w-auto h-12 px-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold whitespace-nowrap"
                            >
                              Nhận báo giá ngay
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground text-center lg:text-left mt-4">
                          Miễn phí tư vấn • Phản hồi trong 24h
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
