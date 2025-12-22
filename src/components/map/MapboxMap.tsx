import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Key } from 'lucide-react';

interface WarehouseLocation {
  id: number;
  name: string;
  lat: number;
  lng: number;
  capacity: number;
  status: string;
}

interface MapboxMapProps {
  warehouses: WarehouseLocation[];
  onWarehouseSelect?: (id: number) => void;
  selectedWarehouse?: number | null;
}

const MapboxMap = ({ warehouses, onWarehouseSelect, selectedWarehouse }: MapboxMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapboxToken, setMapboxToken] = useState(() => {
    return localStorage.getItem('mapbox_token') || '';
  });
  const [inputToken, setInputToken] = useState(mapboxToken);
  const [isMapReady, setIsMapReady] = useState(!!mapboxToken);

  const handleSaveToken = () => {
    localStorage.setItem('mapbox_token', inputToken);
    setMapboxToken(inputToken);
    setIsMapReady(true);
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [106.6297, 16.0544], // Center of Vietnam
        zoom: 5.5,
        pitch: 30,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.addControl(
        new mapboxgl.FullscreenControl(),
        'top-right'
      );

      map.current.on('load', () => {
        // Add markers for each warehouse
        warehouses.forEach((warehouse) => {
          const el = document.createElement('div');
          el.className = 'warehouse-marker';
          el.innerHTML = `
            <div class="relative cursor-pointer transform transition-transform hover:scale-110">
              <div class="w-8 h-8 rounded-full ${warehouse.status === 'Hoạt động' ? 'bg-green-500' : 'bg-yellow-500'} flex items-center justify-center shadow-lg border-2 border-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 ${warehouse.status === 'Hoạt động' ? 'bg-green-500' : 'bg-yellow-500'} rotate-45"></div>
            </div>
          `;

          const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-semibold text-sm">${warehouse.name}</h3>
                <p class="text-xs text-gray-600">Công suất: ${warehouse.capacity}%</p>
                <p class="text-xs ${warehouse.status === 'Hoạt động' ? 'text-green-600' : 'text-yellow-600'}">${warehouse.status}</p>
              </div>
            `);

          const marker = new mapboxgl.Marker(el)
            .setLngLat([warehouse.lng, warehouse.lat])
            .setPopup(popup)
            .addTo(map.current!);

          el.addEventListener('click', () => {
            onWarehouseSelect?.(warehouse.id);
          });

          markersRef.current.push(marker);
        });
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      setIsMapReady(false);
      setMapboxToken('');
      localStorage.removeItem('mapbox_token');
    }

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      map.current?.remove();
    };
  }, [mapboxToken, warehouses, onWarehouseSelect]);

  // Fly to selected warehouse
  useEffect(() => {
    if (!map.current || !selectedWarehouse) return;
    
    const warehouse = warehouses.find(w => w.id === selectedWarehouse);
    if (warehouse) {
      map.current.flyTo({
        center: [warehouse.lng, warehouse.lat],
        zoom: 12,
        duration: 1500,
      });
    }
  }, [selectedWarehouse, warehouses]);

  if (!isMapReady) {
    return (
      <Card className="h-[600px] flex items-center justify-center">
        <CardContent className="text-center space-y-4 max-w-md">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Key className="h-8 w-8 text-primary" />
          </div>
          <CardHeader className="p-0">
            <CardTitle>Nhập Mapbox Token</CardTitle>
          </CardHeader>
          <p className="text-sm text-muted-foreground">
            Để sử dụng bản đồ, vui lòng nhập Mapbox public token của bạn. 
            Bạn có thể lấy token miễn phí tại{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              mapbox.com
            </a>
          </p>
          <div className="flex gap-2">
            <Input 
              placeholder="pk.eyJ1Ijo..." 
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSaveToken} disabled={!inputToken}>
              <MapPin className="h-4 w-4 mr-2" />
              Lưu
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative h-[600px] rounded-lg overflow-hidden border">
      <div ref={mapContainer} className="absolute inset-0" />
      <style>{`
        .mapboxgl-popup-content {
          border-radius: 8px;
          padding: 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .mapboxgl-popup-tip {
          border-top-color: white;
        }
      `}</style>
    </div>
  );
};

export default MapboxMap;
