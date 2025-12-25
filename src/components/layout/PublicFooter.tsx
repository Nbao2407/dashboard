import { Link } from "react-router-dom";
import { Package, Mail, Phone, MapPin } from "lucide-react";

const PublicFooter = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                <Package className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-heading-sm">GenHub</span>
            </Link>
            <p className="text-body-sm text-muted-foreground">
              Hệ thống cho thuê kho bãi chuyên nghiệp. Giải pháp lưu trữ linh hoạt cho mọi nhu cầu kinh doanh.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-subtitle">Liên kết nhanh</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-body-sm text-muted-foreground hover:text-foreground transition-colors">
                Giới thiệu
              </Link>
              <Link to="/warehouses" className="text-body-sm text-muted-foreground hover:text-foreground transition-colors">
                Danh sách kho
              </Link>
              <Link to="/pricing" className="text-body-sm text-muted-foreground hover:text-foreground transition-colors">
                Bảng giá
              </Link>
              <Link to="/contact" className="text-body-sm text-muted-foreground hover:text-foreground transition-colors">
                Liên hệ
              </Link>
            </nav>
          </div>

          {/* Dịch vụ */}
          <div className="space-y-4">
            <h4 className="text-subtitle">Dịch vụ</h4>
            <nav className="flex flex-col gap-2">
              <span className="text-body-sm text-muted-foreground">Kho thường</span>
              <span className="text-body-sm text-muted-foreground">Kho lạnh</span>
              <span className="text-body-sm text-muted-foreground">Kho ngoại quan</span>
              <span className="text-body-sm text-muted-foreground">Dịch vụ Fulfillment</span>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-subtitle">Liên hệ</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>123 Nguyễn Văn Linh, Quận 7, TP.HCM</span>
              </div>
              <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>1900 1234 56</span>
              </div>
              <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span>contact@genhub.vn</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-caption">
            © {new Date().getFullYear()} GenHub. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
