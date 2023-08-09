import { SCREEN_PATH } from "../../constant/constant";

const goToAccManage= (func) => {
    // localStorage.setItem('menuItemOrder', 0);
    func(SCREEN_PATH.ADMIN.ACCOUNT_MANAGE);
} 
const goToEpidemicAnalyse= (func) => {
    // console.log(SCREEN_PATH.EXPERT.EPIDEMIC_ANALYSE);
    // localStorage.setItem('menuItemOrder', 0);
    func(SCREEN_PATH.EXPERT.EPIDEMIC_ANALYSE);
} 
const goToSupplyAnalyse= (func) => {
    // console.log(SCREEN_PATH.EXPERT.SUPPLIES_ANALYSE);
    // localStorage.setItem('menuItemOrder', 1);
    func(SCREEN_PATH.EXPERT.SUPPLIES_ANALYSE);
} 
const goToDistributionAnalyse= (func) => {
    // console.log(SCREEN_PATH.EXPERT.DISTRIBUTION_ANALYSE);
    // localStorage.setItem('menuItemOrder', 2);
    func(SCREEN_PATH.EXPERT.DISTRIBUTION_ANALYSE);
} 
const goToDbModify= (func) => {
    // console.log(SCREEN_PATH.EXPERT.DB_MODYFY);
    // localStorage.setItem('menuItemOrder', 3);
    func(SCREEN_PATH.EXPERT.DB_MODYFY);
} 
const goToEpidemicDisplay= (func) => {
    // localStorage.setItem('menuItemOrder', 0);
    func(SCREEN_PATH.GUEST.EPIDEMIC_DISPLAY);
} 
const goToSuppliesDisplay= (func) => {
    // localStorage.setItem('menuItemOrder', 1);
    func(SCREEN_PATH.GUEST.SUPPLIES_DISPLAY);
} 
const goToDistributionDisplay= (func) => {
    // localStorage.setItem('menuItemOrder', 2);
    func(SCREEN_PATH.GUEST.DISTRIBUTION_DISPLAY);
} 

const NavigationSidebar = [
    // ADMIN: 
    [goToAccManage,],
    // EXPERT: 
    [
        goToEpidemicAnalyse,
        goToSupplyAnalyse,
        goToDistributionAnalyse,
        goToDbModify,
    ],
    // GUEST: 
    [
        goToEpidemicDisplay,
        goToSuppliesDisplay,
        goToDistributionDisplay,
    ]
]

export default NavigationSidebar;