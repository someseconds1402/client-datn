export const PATH = {
    HOME: '/',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    SYSTEM: '/system',
    NOT_FOUND: '/*',

    ACCOUNT_MANAGE: '/acc-manage',

    EPIDEMIC_ANALYSE: '/epidemic-analyse',
    SUPPLIES_ANALYSE: '/supply-analyse',
    DISTRIBUTION_ANALYSE: '/distribution-analyse',
    DB_MODYFY: '/db-modify',

    EPIDEMIC_DISPLAY: '/epidemic-display',
    SUPPLIES_DISPLAY: '/supplies-display',
    DISTRIBUTION_DISPLAY: '/distribution-display',
};

export const SCREEN_PATH = [
    // ADMIN: 
    [
        '/acc-manage',
    ],
    // EXPERT: 
    [
        '/epidemic-analyse',
        '/supply-analyse',
        // '/distribution-analyse',
        '/db-modify',
    ],
    // GUEST: 
    [
        '/epidemic-display',
        '/supplies-display',
        '/distribution-display',
    ],
];

export const PATH_API = {
    BASE_URL: 'https://medical-supply-20184139.onrender.com',
    LOGIN_API: '/api/login',
    GET_PROVINCE_DATA: '/api/get-province',
    GET_PANDEMIC_DATA: '/api/get-pandemic',
    GET_SUPPLY_TYPE_DATA: '/api/get-supply-type',
    GET_MEDICAL_SUPPLY_DATA: '/api/get-medical-supply',
    GET_EPIDEMIC_DATA: '/api/get-epidemic',
    GET_SUPPLY_QUANTITY: '/api/get-supply-quantity',
    GET_ALL_EMAIL: '/api/get-all-eamil',
    ADD_USER: '/api/add-user',
    DELETE_USER: '/api/delete-user',
    GET_EPIDEMIC_DATA_OF_ALL_PROVINCES: '/api/get-epidemic-data-of-all-provinces',
    GET_SUPPLY_QUANTITY_OF_ALL_PROVINCES: '/api/get-supply-quantity-of-all-provinces',
    CLUSTER: '/api/cluster',
    GET_SUPPLY_ABILITY: '/api/get-supply-ability',
    GET_DISTRIBUTION_DATA: '/api/get-distribution-data',

    // IMPORT DATA
    INSERT_PROVINCE: '/api/insert-provicne',
    INSERT_DISTANCE: '/api/insert-distance',
    INSERT_PANDEMIC: '/api/insert-pandemic',
    INSERT_SUPPLY_TYPE: '/api/insert-supply-type',
    INSERT_SUPPLY_MAP_PANDEMIC: '/api/insert-supply-map-pandemic',
    INSERT_MEDICAL_SUPPY: '/api/insert-medical-supply',

    INSERT_INFECTION_SITUATION: '/api/insert-infection-situation',
    INSERT_RECOVERED_SITUATION: '/api/insert-recovered-situation',
    INSERT_DEATH_SITUATION: '/api/insert-death-situation',
    INSERT_LEVEL: '/api/insert-level',
    INSERT_SUPPLY_QUANTITY: '/api/insert-supply-quantity',
    INSERT_SUPPLY_ABILITY: '/api/insert-supply-ability',
};

export const role = {
    ADMIN: 0,
    EXPERT: 1,
    GUEST: 2,
};

export const loginCondition = {
    LOGIN_SUCCESS: 0,
    EMAIL_NOT_EXIST: 1,
    FAILED_PASSWORD: 2,
};

export const errorCode = {
    NO_ERROR: 0,
    LOGIN_FAILED: 1,
}

export const menuItems = {
    ACCOUNT_MANAGE: "Quản lý tài khoản",
    CREATE_ACCOUNT: "Tạo tài khoản mới",
    MODIFY_ACCOUNT: "Chỉnh sửa tài khoản",
    DELETE_ACCOUNT: "Xóa tài khoản",
    EPIDEMIC_ANALYSE: "Phân tích tình hình dịch bệnh",
    SUPPLIES_ANALYSE: "Phân tích khả năng hỗ trợ VTYT",
    DISTRIBUTION_ANALYSE: "Phân tích tuyến đường phân bổ VTYT",
    DB_MODYFY: "Thêm dữ liệu",
    EPIDEMIC_DISPLAY: "Tra cứu tình hình dịch bệnh",
    SUPPLIES_DISPLAY: "Tra cứu khả năng cung ứng VTYT",
    DISTRIBUTION_DISPLAY: "Tra cứu tuyến đường cung ứng VTYT",
}

export const sidebarMenu = [
    // ADMIN:
    [
        menuItems.ACCOUNT_MANAGE
    ],
    // EXPERT:
    [
        menuItems.EPIDEMIC_ANALYSE,
        menuItems.SUPPLIES_ANALYSE,
        // menuItems.DISTRIBUTION_ANALYSE,
        menuItems.DB_MODYFY
    ],
    // GUEST:
    [
        menuItems.EPIDEMIC_DISPLAY,
        menuItems.SUPPLIES_DISPLAY,
        menuItems.DISTRIBUTION_DISPLAY
    ],
]

export const IMPORT_PROPERTIES = [
    [
        { name: 'province_id', type: 'int' },
        { name: 'population', type: 'int' },
        { name: 'population_density', type: 'float' },
    ],
    [
        { name: 'province_id_1', type: 'int' },
        { name: 'province_id_2', type: 'int' },
        { name: 'distance', type: 'float' },
    ],
    [
        { name: 'pandemic_name', type: '' },
    ],
    [
        { name: 'name', type: '' },
    ],
    [
        { name: 'pandemic_id', type: 'int' },
        { name: 'supply_type_id', type: 'int' },
    ],
    [
        { name: 'supply_type_id', type: 'int' },
        { name: 'supply_name', type: '' },
    ],
    [
        { name: 'province_id', type: 'int' },
        { name: 'pandemic_id', type: 'int' },
        { name: 'date', type: 'date' },
        { name: 'quantity_in_today', type: 'int' },
        { name: 'total_quantity', type: 'int' },
    ],
    [
        { name: 'province_id', type: 'int' },
        { name: 'pandemic_id', type: 'int' },
        { name: 'date', type: 'date' },
        { name: 'quantity_in_today', type: 'int' },
        { name: 'total_quantity', type: 'int' },
    ],
    [
        { name: 'province_id', type: 'int' },
        { name: 'pandemic_id', type: 'int' },
        { name: 'date', type: 'date' },
        { name: 'quantity_in_today', type: 'int' },
        { name: 'total_quantity', type: 'int' },
    ],
    [
        { name: 'province_id', type: 'int' },
        { name: 'supply_id', type: 'int' },
        { name: 'quantity', type: 'int' },
    ],
    [
        { name: 'province_id', type: 'int' },
        { name: 'pandemic_id', type: 'int' },
        { name: 'date', type: 'date' },
        { name: 'level', type: 'int' },
    ],
    [
        { name: 'pandemic_id', type: 'int' },
        { name: 'province_id', type: 'int' },
        { name: 'supply_type_id', type: 'int' },
        { name: 'supply_quantity', type: 'int' },
        { name: 'ability', type: 'int' },
    ],
]