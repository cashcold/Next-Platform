export const SEAFOOD_ITEMS = [
  {
    id: 'snap-01',
    name: 'Red Snapper',
    imageUrl: '/img/sample-snapper.jpg',
    freshnessIndex: 98,
    origin: 'Tema, Ghana',
    catchCode: 'SNAP-GH-01',
    description: 'Wild-caught Red Snapper from the Gulf of Guinea.',
    price: 45.0,
    category: 'finfish',
    vessel: 'M.V. Nyame Nsa',
    depth: 30,
    temperature: 2,
    landingDate: '2026-06-25, 09:30 GMT',
    sustainability: 'MSC Certified'
  },
  {
    id: 'til-01',
    name: 'Volta Tilapia',
    imageUrl: '/img/sample-tilapia.jpg',
    freshnessIndex: 95,
    origin: 'Akosombo, Ghana',
    catchCode: 'TILA-GH-01',
    description: 'Fresh Volta lake tilapia, responsibly farmed.',
    price: 25.5,
    category: 'finfish',
    vessel: 'M.V. Akosombo Warrior',
    depth: 5,
    temperature: 1,
    landingDate: '2026-06-24, 16:10 GMT',
    sustainability: 'Local Sustainable'
  }
];

export const RECIPES = [
  {
    id: 'recipe-1',
    name: 'Grilled Red Snapper',
    imageUrl: '/img/recipe-snapper.jpg',
    prepTime: 15,
    cookTime: 20,
    difficulty: 'Easy',
    description: 'Simple grilled snapper with Ghanaian spices.',
    ingredients: [
      { name: 'Red Snapper', baseAmount: 1, unit: 'whole' },
      { name: 'Lemon', baseAmount: 1, unit: 'pcs' },
      { name: 'Salt', baseAmount: 1, unit: 'tsp' }
    ],
    instructions: [
      'Clean and score the fish. Rub with salt and lemon. Grill for 10 minutes per side.',
      'Serve with fresh salad and boiled yams.'
    ]
  }
];

export default {
  SEAFOOD_ITEMS,
  RECIPES
};
