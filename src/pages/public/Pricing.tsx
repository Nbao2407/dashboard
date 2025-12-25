import { Check, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const pricingPlans = [
  {
    name: "Kho thường",
    description: "Phù hợp cho hàng hóa thông thường",
    price: "55.000",
    unit: "đ/m²/tháng",
    popular: false,
    features: [
      "Bảo vệ 24/7",
      "Hệ thống PCCC đạt chuẩn",
      "Bãi đậu xe rộng rãi",
      "Loading dock tiêu chuẩn",
      "Hỗ trợ kỹ thuật",
      "Giám sát camera",
    ],
  },
  {
    name: "Kho lạnh",
    description: "Kiểm soát nhiệt độ chuyên nghiệp",
    price: "85.000",
    unit: "đ/m²/tháng",
    popular: true,
    features: [
      "Tất cả tính năng Kho thường",
      "Kiểm soát nhiệt độ 24/7",
      "Hệ thống làm lạnh công nghiệp",
      "Giám sát nhiệt độ realtime",
      "Báo cáo nhiệt độ hàng ngày",
      "Ưu tiên hỗ trợ kỹ thuật",
    ],
  },
  {
    name: "Kho ngoại quan",
    description: "Thủ tục hải quan thuận tiện",
    price: "75.000",
    unit: "đ/m²/tháng",
    popular: false,
    features: [
      "Tất cả tính năng Kho thường",
      "Vị trí trong khu ngoại quan",
      "Hỗ trợ thủ tục hải quan",
      "Lưu trữ hàng XNK",
      "Tư vấn pháp lý",
      "Kết nối với cảng biển",
    ],
  },
];

const faqs = [
  {
    question: "Thời gian thuê tối thiểu là bao lâu?",
    answer: "Thời gian thuê tối thiểu là 1 tháng. Chúng tôi cũng hỗ trợ thuê theo ngày cho các nhu cầu ngắn hạn với mức giá riêng.",
  },
  {
    question: "Chi phí trên đã bao gồm những gì?",
    answer: "Giá niêm yết đã bao gồm: tiền thuê kho, bảo vệ, điện chiếu sáng chung, PCCC, vệ sinh khu vực chung. Chưa bao gồm: điện sử dụng riêng, phí bốc xếp, phí đóng gói.",
  },
  {
    question: "Có được chia nhỏ diện tích không?",
    answer: "Có, chúng tôi hỗ trợ thuê từ 50m² trở lên. Với diện tích nhỏ hơn, vui lòng liên hệ để được tư vấn.",
  },
  {
    question: "Quy trình thuê kho như thế nào?",
    answer: "Quy trình gồm: 1) Tìm kiếm và chọn kho phù hợp, 2) Đặt lịch tham quan, 3) Ký hợp đồng và đặt cọc, 4) Nhận bàn giao kho. Toàn bộ quy trình có thể hoàn thành trong 1-3 ngày.",
  },
  {
    question: "Hình thức thanh toán như thế nào?",
    answer: "Chúng tôi chấp nhận thanh toán chuyển khoản ngân hàng, thẻ tín dụng/ghi nợ, và ví điện tử. Thanh toán hàng tháng hoặc theo quý với ưu đãi.",
  },
  {
    question: "Có chính sách hoàn tiền không?",
    answer: "Tiền đặt cọc sẽ được hoàn lại khi kết thúc hợp đồng và bàn giao kho đúng quy định. Trường hợp hủy sớm, vui lòng xem điều khoản trong hợp đồng.",
  },
];

const Pricing = () => {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-display-sm">Bảng giá cho thuê kho</h1>
            <p className="text-body-lg text-muted-foreground">
              Giá cả minh bạch, cạnh tranh. Không phí ẩn, không bất ngờ.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Phổ biến nhất
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-heading-lg">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6">
                    <span className="text-stat">{plan.price}</span>
                    <span className="text-body-sm text-muted-foreground ml-1">{plan.unit}</span>
                  </div>
                  <ul className="space-y-3 text-left">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-body-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link to="/contact">Liên hệ báo giá</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-heading-xl text-center mb-8">Dịch vụ bổ sung</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: "Bốc xếp hàng hóa", price: "Từ 50.000đ/tấn" },
                { name: "Đóng gói, đóng kiện", price: "Theo thỏa thuận" },
                { name: "Vận chuyển nội bộ", price: "Từ 200.000đ/chuyến" },
                { name: "Kiểm đếm hàng hóa", price: "Từ 100.000đ/lần" },
                { name: "Bảo hiểm hàng hóa", price: "0.1% giá trị hàng" },
                { name: "Fulfillment/E-commerce", price: "Theo thỏa thuận" },
              ].map((service) => (
                <div 
                  key={service.name} 
                  className="flex items-center justify-between p-4 bg-background rounded-lg border"
                >
                  <span className="text-body">{service.name}</span>
                  <span className="text-body-sm text-primary font-medium">{service.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-heading-xl mb-2">Câu hỏi thường gặp</h2>
              <p className="text-body text-muted-foreground">
                Những thắc mắc phổ biến về dịch vụ cho thuê kho
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-body">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-body-sm text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-heading-xl">Cần báo giá chi tiết?</h2>
            <p className="text-body opacity-90">
              Liên hệ ngay để nhận báo giá riêng theo nhu cầu cụ thể của bạn
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Liên hệ ngay</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
