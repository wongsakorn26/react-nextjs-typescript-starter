export type CS2Skin = {
    id: string;
    name: string;
    description: string;
    weapon: {
        id: string;
        weapon_id: number;
        name: string;
    };
    category: {
        id: string;
        name: string;
    };
    pattern: {
        id: string;
        name: string;
    };
    min_float: number;
    max_float: number;
    rarity: {
        id: string;
        name: string;
        color: string;
    };
    stattrak: boolean;
    souvenir: boolean;
    paint_index: string;
    wears: {
        id: string;
        name: string;
    }[];
    collections: any[]; // Empty array, could be typed later if structure known
    crates: {
        id: string;
        name: string;
        image: string;
    }[];
    team: {
        id: string;
        name: string;
    };
    legacy_model: boolean;
    image: string;
};

export type MinimalSkin = {
    id: string;
    name: string;
    image: string;
}
