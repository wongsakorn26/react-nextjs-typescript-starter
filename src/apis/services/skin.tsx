import api from "../axios";

export class SkinService {
  static async getSkin() {
    try {
      const response = await api.get("/skins.json");
      return response.data;
    } catch (error) {
      throw new Error(`Fail to fetch skin ${error}`);
    }
  }
}
export default SkinService;
