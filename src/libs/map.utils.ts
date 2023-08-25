import axios from "axios";
import { LatLng } from "use-places-autocomplete";

export interface StartGoalLgnLat {
  startLng: string;
  startLat: string;
  goalLng: string;
  goalLat: string;
}

export interface PathInfo {
  path: any;
  distance: string;
  duration: string;
  fuelPrice: string;
  taxiPrice: string;
  tollFare: string;
}

export interface UtilReturn {
  success: boolean;
  data: any;
}

export interface LocationInfoRerutn {
  desc: string;
  placeId: any;
  location: LatLng;
  key: number;
}
export const MapUtils = {
  // 내위치 조회
  getMyLocation: async (returnCallback: Function) => {
    // 브라우저가 Geolocation을 지원하는지 확인
    if ("geolocation" in navigator) {
      // 현재 위치를 가져옴
      navigator.geolocation.getCurrentPosition(
        function (location) {
          // 위도와 경도를 변수에 저장
          var lat = location.coords.latitude;
          var lng = location.coords.longitude;

          // 결과를 콘솔에 출력 (또는 원하는 대로 처리)
          returnCallback({ success: true, data: { lat, lng } });
        },
        function (err) {
          // 위치 정보를 가져오는데 실패했을 때 오류 메시지를 출력
          returnCallback({
            success: false,
            data: "위치 정보를 가져오는데 실패했습니다. 오류: " + err,
          });

          return false;
        }
      );
    } else {
      // 브라우저가 Geolocation을 지원하지 않으면 오류 메시지 출력
      returnCallback({
        success: false,
        data: "이 브라우저는 위치 서비스를 지원하지 않습니다.",
      });

      return false;
    }
  },
  // 경로 가져오기
  getPath: async ({
    startLng,
    startLat,
    goalLng,
    goalLat,
  }: StartGoalLgnLat): Promise<PathInfo> => {
    const res = await axios.get(
      `/api/naver.path?startLng=${startLng}&startLat=${startLat}&goalLng=${goalLng}&goalLat=${goalLat}`
    );

    const data = res.data.route.traoptimal[0];
    const summary = data.summary;
    const result: PathInfo = {
      path: data.path,
      distance: summary.distance,
      duration: summary.duration,
      fuelPrice: summary.fuelPrice,
      taxiPrice: summary.taxiFare,
      tollFare: summary.tollFare,
    };

    return result;
  },

  getLocationInfo: async (
    lat: number,
    lng: number
  ): Promise<LocationInfoRerutn> => {
    const info = await axios.get(`/api/google.map/info?lat=${lat}&lng=${lng}`);
    const temp = info.data.results[0];
    const placeInfo = await axios.get(
      `/api/google.map/latlng?place_id=${temp.place_id}`
    );

    return {
      desc: temp.formatted_address,
      placeId: temp.place_id,
      location: placeInfo.data.result.geometry.location,
      key: -1,
    };
  },
};
