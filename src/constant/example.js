const PROVINCE = [
    { province_id: 1, population: 1864651, population_density: 527.23 },
    { province_id: 2, population: 1181302, population_density: 596.38 },
    { province_id: 3, population: 917734, population_density: 343.85 },
    { province_id: 4, population: 1858540, population_density: 482.56 }
]

const DISTANCE = [
    { province_id_1: 1, province_id_2: 2, distance: 42.75 },
    { province_id_1: 1, province_id_2: 3, distance: 9.20 },
    { province_id_1: 1, province_id_2: 4, distance: 57.81 },
    { province_id_1: 1, province_id_2: 5, distance: 413.04 },
]

const PANDEMIC = [
    { pandemic_name: "Covid-19" },
    { pandemic_name: "Sốt xuất huyết" },
]

const SUPPLY_TYPE = [
    { name: "Kit test Covid-19" },
    { name: "Vắc xin Covid-19" },
]

const SUPPLY_MAP_PANDEMIC = [
    { pandemic_id: 0, supply_type_id: 0 },
    { pandemic_id: 0, supply_type_id: 1 }
]

const MEDICAL_SUPPY = [
    { supply_type_id: 0, supply_name: "Flowflex SARSCoV-2 Antigen Rapid Test" },
    { supply_type_id: 0, supply_name: "Trueline Covid-19 Ag Rapid Test" },
    { supply_type_id: 0, supply_name: "Biosynex Covid-19 Ag BSS" },
    { supply_type_id: 0, supply_name: "V Trust Covid-19 Antigen Rapid Test" },
]

const INFECTION_SITUATION = [
    { province_id: 1, pandemic_id: 0, date: "2023-7-3", quantity_in_today: 144, total_quantity: 78484 },
    { province_id: 1, pandemic_id: 0, date: "2023-7-4", quantity_in_today: 67, total_quantity: 78551 },
    { province_id: 1, pandemic_id: 0, date: "2023-7-5", quantity_in_today: 30, total_quantity: 78581 },
    { province_id: 1, pandemic_id: 0, date: "2023-7-6", quantity_in_today: 23, total_quantity: 78604 },
    { province_id: 1, pandemic_id: 0, date: "2023-7-7", quantity_in_today: 94, total_quantity: 78698 },
]

const RECOVERED_SITUATION = [
    { province_id: 1, pandemic_id: 0, date: "2023-7-3", quantity_in_today: 144, total_quantity: 78484 },
    { province_id: 1, pandemic_id: 0, date: "2023-7-4", quantity_in_today: 67, total_quantity: 78551 },
    { province_id: 1, pandemic_id: 0, date: "2023-7-5", quantity_in_today: 30, total_quantity: 78581 },
    { province_id: 1, pandemic_id: 0, date: "2023-7-6", quantity_in_today: 23, total_quantity: 78604 },
    { province_id: 1, pandemic_id: 0, date: "2023-7-7", quantity_in_today: 94, total_quantity: 78698 },
]

const DEATH_SITUATION = [
    { province_id: 1, pandemic_id: 0, date: "2023-7-3", quantity_in_today: 144, total_quantity: 78484 },
    { province_id: 1, pandemic_id: 0, date: "2023-7-4", quantity_in_today: 67, total_quantity: 78551 },
    { province_id: 1, pandemic_id: 0, date: "2023-7-5", quantity_in_today: 30, total_quantity: 78581 },
    { province_id: 1, pandemic_id: 0, date: "2023-7-6", quantity_in_today: 23, total_quantity: 78604 },
    { province_id: 1, pandemic_id: 0, date: "2023-7-7", quantity_in_today: 94, total_quantity: 78698 },
]

const LEVEL = [
    { province_id: 1, pandemic_id: 0, date: "2023-7-7", level: 1 },
    { province_id: 2, pandemic_id: 0, date: "2023-7-7", level: 1 },
    { province_id: 3, pandemic_id: 0, date: "2023-7-7", level: 1 },
    { province_id: 4, pandemic_id: 0, date: "2023-7-7", level: 1 },
]

const SUPPLY_QUANTITY = [
    { province_id: 1, supply_id: 16, quantity: 2510377 },
    { province_id: 1, supply_id: 17, quantity: 684819 },
    { province_id: 1, supply_id: 18, quantity: 2476013 },
    { province_id: 1, supply_id: 19, quantity: 3605967 },
    { province_id: 1, supply_id: 20, quantity: 2438966 },
    { province_id: 1, supply_id: 21, quantity: 3333237 },
]

const SUPPLY_ABILITY = [
    { pandemic_id: 0, province_id: 2, supply_type_id: 0, supply_quantity: 25154257, ability: 1 },
    { pandemic_id: 0, province_id: 4, supply_type_id: 0, supply_quantity: 32907105, ability: 1 },
    { pandemic_id: 0, province_id: 5, supply_type_id: 0, supply_quantity: 5092564, ability: 1 },
    { pandemic_id: 0, province_id: 8, supply_type_id: 0, supply_quantity: 45285013, ability: 1 },
    { pandemic_id: 0, province_id: 14, supply_type_id: 0, supply_quantity: 20172723, ability: 1 },
]

export const EXAMPLE = [
    { name: 'Example_PROVINCE', data: PROVINCE },
    { name: 'Example_DISTANCE', data: DISTANCE },
    { name: 'Example_PANDEMIC', data: PANDEMIC },
    { name: 'Example_SUPPLY_TYPE', data: SUPPLY_TYPE },
    { name: 'Example_SUPPLY_MAP_PANDEMIC', data: SUPPLY_MAP_PANDEMIC },
    { name: 'Example_MEDICAL_SUPPY', data: MEDICAL_SUPPY },
    { name: 'Example_INFECTION_SITUATION', data: INFECTION_SITUATION },
    { name: 'Example_RECOVERED_SITUATION', data: RECOVERED_SITUATION },
    { name: 'Example_DEATH_SITUATION', data: DEATH_SITUATION },
    { name: 'Example_SUPPLY_QUANTITY', data: SUPPLY_QUANTITY },
    { name: 'Example_LEVEL', data: LEVEL },
    { name: 'Example_SUPPLY_ABILITY', data: SUPPLY_ABILITY },
]