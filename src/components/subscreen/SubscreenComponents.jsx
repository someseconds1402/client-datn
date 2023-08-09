import AccManage from "./admin/AccManage";
import DbModify from "./expert/DbModify";
import DistributionAnalyse from "./expert/DistributionAnalyse";
import EpidemicAnalyse from "./expert/EpidemicAnalyse";
import EpidemicAnalyse_New from "./expert/EpidemicAnalyse_New";
import SupplyAnalyse from "./expert/SupplyAnalyse";
import DistributionDisplay from "./guest/DistributionDisplay";
import EpidemicDisplay from "./guest/EpidemicDisplay";
import SuppliesDisplay from "./guest/SuppliesDisplay";
import SupplyAnalyse_New from "./expert/SupplyAnalyse_New"

const SubscreenComponents = {
    ADMIN: {
        AccManage,
    },
    EXPERT: {
        DbModify,
        DistributionAnalyse,
        EpidemicAnalyse: EpidemicAnalyse_New,
        SupplyAnalyse: SupplyAnalyse_New,
    },
    GUEST: {
        DistributionDisplay,
        EpidemicDisplay,
        SuppliesDisplay,
    }
};

export default SubscreenComponents;