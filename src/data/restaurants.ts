/**
 * src/data/restaurants.ts
 *
 * Static seed data for the 10 York-based restaurants.
 * These never change at runtime — no need for state or storage.
 *
 * Menu item IDs are globally unique so they can be referenced
 * across meal entries without ambiguity.
 *
 * Category distribution per restaurant:
 *   1–2 APPETIZER  |  2–3 MAIN COURSE  |  1 DESSERT
 */

import type { Restaurant } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: 'rest-01',
    name: 'The Shambles Kitchen',
    address: '12 The Shambles, York',
    description:
      'A cosy medieval-street bistro tucked inside one of York\'s oldest thoroughfares. '
      + 'Seasonal British produce cooked simply and served in a warm, wood-beamed room.',
    menu: [
      { id: 'item-r01-01', name: 'Roasted Carrot Soup',       category: 'APPETIZER',   price: 6.50 },
      { id: 'item-r01-02', name: 'Smoked Salmon Blini',       category: 'APPETIZER',   price: 8.00 },
      { id: 'item-r01-03', name: 'Yorkshire Beef Stew',       category: 'MAIN COURSE', price: 15.50 },
      { id: 'item-r01-04', name: 'Pan-Roasted Chicken Thigh', category: 'MAIN COURSE', price: 14.00 },
      { id: 'item-r01-05', name: 'Wild Mushroom Risotto',     category: 'MAIN COURSE', price: 13.00 },
      { id: 'item-r01-06', name: 'Sticky Toffee Pudding',     category: 'DESSERT',     price: 7.00 },
    ],
  },
  {
    id: 'rest-02',
    name: 'Bootham Brasserie',
    address: '45 Bootham, York',
    description:
      'A relaxed neighbourhood brasserie near the city walls offering all-day dining. '
      + 'French-influenced dishes with locally sourced Yorkshire ingredients.',
    menu: [
      { id: 'item-r02-01', name: 'French Onion Soup',         category: 'APPETIZER',   price: 7.00 },
      { id: 'item-r02-02', name: 'Duck Rillettes',            category: 'APPETIZER',   price: 8.50 },
      { id: 'item-r02-03', name: 'Steak Frites',              category: 'MAIN COURSE', price: 19.00 },
      { id: 'item-r02-04', name: 'Roasted Sea Bass',          category: 'MAIN COURSE', price: 17.50 },
      { id: 'item-r02-05', name: 'Crème Brûlée',              category: 'DESSERT',     price: 6.50 },
    ],
  },
  {
    id: 'rest-03',
    name: 'Micklegate Bistro',
    address: '78 Micklegate, York',
    description:
      'An independent bistro on one of York\'s most historic streets. '
      + 'Known for hearty portions, daily specials, and a warm welcome from the local team.',
    menu: [
      { id: 'item-r03-01', name: 'Chicken Liver Pâté',        category: 'APPETIZER',   price: 6.00 },
      { id: 'item-r03-02', name: 'Lamb Shoulder',             category: 'MAIN COURSE', price: 18.00 },
      { id: 'item-r03-03', name: 'Grilled Halloumi Salad',    category: 'MAIN COURSE', price: 12.50 },
      { id: 'item-r03-04', name: 'Slow-Braised Pork Belly',   category: 'MAIN COURSE', price: 16.00 },
      { id: 'item-r03-05', name: 'Lemon Tart',                category: 'DESSERT',     price: 6.00 },
    ],
  },
  {
    id: 'rest-04',
    name: 'Stonegate Social',
    address: '23 Stonegate, York',
    description:
      'A lively spot on the famous pedestrian lane steps from the Minster. '
      + 'Contemporary small plates designed for sharing over long lunches.',
    menu: [
      { id: 'item-r04-01', name: 'Burrata & Heritage Tomato', category: 'APPETIZER',   price: 9.00 },
      { id: 'item-r04-02', name: 'Crispy Calamari',           category: 'APPETIZER',   price: 7.50 },
      { id: 'item-r04-03', name: 'Pulled Beef Flatbread',     category: 'MAIN COURSE', price: 14.50 },
      { id: 'item-r04-04', name: 'Truffle Mac & Cheese',      category: 'MAIN COURSE', price: 13.00 },
      { id: 'item-r04-05', name: 'Chocolate Fondant',         category: 'DESSERT',     price: 7.50 },
    ],
  },
  {
    id: 'rest-05',
    name: 'The Guild Rooms',
    address: '15 Goodramgate, York',
    description:
      'Set inside a restored guildhall, this restaurant blends heritage architecture '
      + 'with a modern British menu celebrating North Yorkshire producers.',
    menu: [
      { id: 'item-r05-01', name: 'Beetroot & Goat Cheese',    category: 'APPETIZER',   price: 7.50 },
      { id: 'item-r05-02', name: 'Seared Scallops',           category: 'APPETIZER',   price: 11.00 },
      { id: 'item-r05-03', name: 'Dry-Aged Ribeye',           category: 'MAIN COURSE', price: 26.00 },
      { id: 'item-r05-04', name: 'Roast Hake Fillet',         category: 'MAIN COURSE', price: 18.50 },
      { id: 'item-r05-05', name: 'Venison Pie',               category: 'MAIN COURSE', price: 19.00 },
      { id: 'item-r05-06', name: 'Eton Mess',                 category: 'DESSERT',     price: 7.00 },
    ],
  },
  {
    id: 'rest-06',
    name: 'Fossgate Social',
    address: '32 Fossgate, York',
    description:
      'A relaxed, dog-friendly kitchen on Fossgate serving stripped-back comfort food. '
      + 'Open kitchen, daily-changing menu, and a strong focus on reducing food waste.',
    menu: [
      { id: 'item-r06-01', name: 'Leek & Potato Soup',        category: 'APPETIZER',   price: 5.50 },
      { id: 'item-r06-02', name: 'Crispy Pig Cheeks',         category: 'APPETIZER',   price: 8.00 },
      { id: 'item-r06-03', name: 'Beer-Battered Fish & Chips',category: 'MAIN COURSE', price: 14.00 },
      { id: 'item-r06-04', name: 'Smashed Burger',            category: 'MAIN COURSE', price: 13.50 },
      { id: 'item-r06-05', name: 'Butternut Squash Curry',    category: 'MAIN COURSE', price: 12.00 },
      { id: 'item-r06-06', name: 'Warm Brownie',              category: 'DESSERT',     price: 6.00 },
    ],
  },
  {
    id: 'rest-07',
    name: 'The Gillygate',
    address: '7 Gillygate, York',
    description:
      'A neighbourhood favourite just inside the city walls offering unfussy, '
      + 'ingredient-led cooking. A proper local restaurant in the best sense.',
    menu: [
      { id: 'item-r07-01', name: 'Garlic Bread Bruschetta',   category: 'APPETIZER',   price: 5.00 },
      { id: 'item-r07-02', name: 'Chicken Caesar Salad',      category: 'APPETIZER',   price: 8.50 },
      { id: 'item-r07-03', name: 'Linguine Alle Vongole',     category: 'MAIN COURSE', price: 15.00 },
      { id: 'item-r07-04', name: 'Pork Milanese',             category: 'MAIN COURSE', price: 16.50 },
      { id: 'item-r07-05', name: 'Tiramisu',                  category: 'DESSERT',     price: 6.50 },
    ],
  },
  {
    id: 'rest-08',
    name: 'Coney Street Kitchen',
    address: '54 Coney Street, York',
    description:
      'A bright, modern kitchen in the heart of York\'s main shopping street. '
      + 'Quick lunches and relaxed dinners with a menu that spans Asian and European influences.',
    menu: [
      { id: 'item-r08-01', name: 'Miso Soup with Tofu',       category: 'APPETIZER',   price: 5.50 },
      { id: 'item-r08-02', name: 'Korean Chicken Wings',      category: 'APPETIZER',   price: 8.00 },
      { id: 'item-r08-03', name: 'Ramen Noodle Bowl',         category: 'MAIN COURSE', price: 13.50 },
      { id: 'item-r08-04', name: 'Teriyaki Salmon',           category: 'MAIN COURSE', price: 16.00 },
      { id: 'item-r08-05', name: 'Mango Sticky Rice',         category: 'DESSERT',     price: 6.00 },
    ],
  },
  {
    id: 'rest-09',
    name: 'Petergate Plates',
    address: '19 High Petergate, York',
    description:
      'Located opposite the Minster with views to match. Small seasonal plates designed '
      + 'for curious eaters, with a regularly changing wine list to complement.',
    menu: [
      { id: 'item-r09-01', name: 'Whipped Ricotta Crostini',  category: 'APPETIZER',   price: 7.00 },
      { id: 'item-r09-02', name: 'Tuna Tartare',              category: 'APPETIZER',   price: 11.50 },
      { id: 'item-r09-03', name: 'Duck Confit',               category: 'MAIN COURSE', price: 20.00 },
      { id: 'item-r09-04', name: 'Gnocchi al Pesto',          category: 'MAIN COURSE', price: 14.00 },
      { id: 'item-r09-05', name: 'Panna Cotta',               category: 'DESSERT',     price: 6.50 },
    ],
  },
  {
    id: 'rest-10',
    name: 'Museum Gardens Grill',
    address: '2 Museum Street, York',
    description:
      'A terrace restaurant overlooking the ruins of St Mary\'s Abbey. '
      + 'Classic grill cooking — steaks, chops, and fresh fish — in a spectacular setting.',
    menu: [
      { id: 'item-r10-01', name: 'Prawn Cocktail',            category: 'APPETIZER',   price: 9.00 },
      { id: 'item-r10-02', name: 'Charred Corn Soup',         category: 'APPETIZER',   price: 6.50 },
      { id: 'item-r10-03', name: 'Grilled Sirloin Steak',     category: 'MAIN COURSE', price: 24.00 },
      { id: 'item-r10-04', name: 'Whole Grilled Sea Bream',   category: 'MAIN COURSE', price: 19.50 },
      { id: 'item-r10-05', name: 'Half Rack of Ribs',         category: 'MAIN COURSE', price: 18.00 },
      { id: 'item-r10-06', name: 'Cheesecake',                category: 'DESSERT',     price: 7.00 },
    ],
  },
];

/**
 * Look up a single restaurant by ID.
 * Returns undefined if not found (callers should handle this).
 */
export function findRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}
