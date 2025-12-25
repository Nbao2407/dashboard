import { Building2, Users, Target, Award, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Target,
    title: "Sứ mệnh",
    description: "Cung cấp giải pháp lưu trữ chuyên nghiệp, linh hoạt và an toàn cho mọi doanh nghiệp Việt Nam.",
  },
  {
    icon: Award,
    title: "Tầm nhìn",
    description: "Trở thành nền tảng cho thuê kho bãi hàng đầu Đông Nam Á vào năm 2030.",
  },
  {
    icon: Users,
    title: "Giá trị cốt lõi",
    description: "Uy tín - Chuyên nghiệp - Tận tâm - Đổi mới sáng tạo.",
  },
];

const milestones = [
  { year: "2018", event: "Thành lập GenHub với 5 kho đầu tiên tại TP.HCM" },
  { year: "2019", event: "Mở rộng ra Hà Nội và Đà Nẵng" },
  { year: "2020", event: "Ra mắt nền tảng đặt kho online" },
  { year: "2021", event: "Đạt 500 khách hàng doanh nghiệp" },
  { year: "2022", event: "Phủ sóng 20 tỉnh thành trên cả nước" },
  { year: "2023", event: "Vượt mốc 1000 khách hàng tin tưởng" },
];

const About = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-display-sm">Về GenHub</h1>
            <p className="text-body-lg text-muted-foreground">
              GenHub là nền tảng cho thuê kho bãi hàng đầu Việt Nam, kết nối doanh nghiệp 
              với hệ thống kho chất lượng cao trên toàn quốc.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-heading-xl">Câu chuyện của chúng tôi</h2>
              <div className="space-y-4 text-body text-muted-foreground">
                <p>
                  GenHub được thành lập năm 2018 với mục tiêu đơn giản hóa quy trình thuê kho cho 
                  các doanh nghiệp Việt Nam. Chúng tôi nhận thấy thị trường cho thuê kho còn nhiều 
                  bất cập: thông tin không minh bạch, thủ tục rườm rà, chất lượng không đồng đều.
                </p>
                <p>
                  Với đội ngũ giàu kinh nghiệm trong lĩnh vực logistics và bất động sản công nghiệp, 
                  chúng tôi đã xây dựng một nền tảng hiện đại, giúp khách hàng dễ dàng tìm kiếm, 
                  so sánh và thuê kho phù hợp chỉ trong vài bước đơn giản.
                </p>
                <p>
                  Sau 5 năm phát triển, GenHub đã trở thành đối tác tin cậy của hơn 1000 doanh nghiệp 
                  từ startup đến tập đoàn lớn, với mạng lưới hơn 50 kho trên 20 tỉnh thành.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Building2 className="h-32 w-32 text-primary/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-xl mb-4">Sứ mệnh & Tầm nhìn</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-heading-sm mb-3">{value.title}</h3>
                  <p className="text-body-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-heading-xl text-center mb-12">Hành trình phát triển</h2>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-label-sm">
                      {milestone.year}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-px h-full bg-border flex-1 mt-2" />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className="text-body pt-2">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-heading-xl mb-8">Cam kết của chúng tôi</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              {[
                "Kho đạt chuẩn chất lượng cao",
                "Giá cả minh bạch, cạnh tranh",
                "Thủ tục nhanh gọn, hỗ trợ 24/7",
                "Bảo mật thông tin tuyệt đối",
                "Linh hoạt điều chỉnh diện tích",
                "Đội ngũ tư vấn chuyên nghiệp",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-body">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
