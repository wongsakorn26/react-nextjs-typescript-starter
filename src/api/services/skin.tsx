import { axiosAuth } from "../axios";

export class SkinService {
  static async getSkin() {
    try {
      const response = await axiosAuth.get("/skins.json");
      return response.data;
    } catch (error) {
      throw new Error(`Fail to fetch skin ${error}`);
    }
  }
}
export default SkinService;
