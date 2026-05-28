/**
 * src/data/restaurants.ts
 *
 * Static seed data for the 10 York-based restaurants.
 * These never change at runtime — no need for state or storage.
 *
 * Images are bundled as local assets via require() so they work offline
 * without any network access.
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
    name: "Bill's Restaurant",
    address: "1 St Sampson's Square, York",
    description:
      "A bright, all-day dining favourite in the heart of York. "
      + "Bill's serves comforting British classics alongside brunch staples "
      + "and crowd-pleasing desserts in its warm, plant-filled interior.",
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    image: require('../../assets/restaurants/bills.jpg'),
    menu: [
      { id: 'item-r01-01', name: 'Soup of the Day',         category: 'APPETIZER',   price: 5.50 },
      { id: 'item-r01-02', name: 'Bruschetta Board',         category: 'APPETIZER',   price: 7.00 },
      { id: 'item-r01-03', name: "Bill's Burger",            category: 'MAIN COURSE', price: 13.50 },
      { id: 'item-r01-04', name: 'Pan-Fried Sea Bass',       category: 'MAIN COURSE', price: 16.00 },
      { id: 'item-r01-05', name: 'Penne Arrabbiata',         category: 'MAIN COURSE', price: 11.00 },
      { id: 'item-r01-06', name: 'Warm Chocolate Brownie',   category: 'DESSERT',     price: 6.50 },
    ],
  },
  {
    id: 'rest-02',
    name: 'YUZU Street Food',
    address: '45 Gillygate, York',
    description:
      'A compact, lively kitchen bringing Japanese and Asian street-food flavours '
      + 'to York. Known for its rich tonkotsu broth, crispy gyoza, '
      + 'and vibrant rice bowls, all made fresh to order.',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    image: require('../../assets/restaurants/yuzu.jpg'),
    menu: [
      { id: 'item-r02-01', name: 'Edamame',                  category: 'APPETIZER',   price: 4.50 },
      { id: 'item-r02-02', name: 'Gyoza (6 pcs)',             category: 'APPETIZER',   price: 7.50 },
      { id: 'item-r02-03', name: 'Tonkotsu Ramen',            category: 'MAIN COURSE', price: 13.00 },
      { id: 'item-r02-04', name: 'Chicken Katsu Curry',       category: 'MAIN COURSE', price: 12.50 },
      { id: 'item-r02-05', name: 'Teriyaki Salmon Bowl',      category: 'MAIN COURSE', price: 14.00 },
      { id: 'item-r02-06', name: 'Mochi Ice Cream',           category: 'DESSERT',     price: 5.50 },
    ],
  },
  {
    id: 'rest-03',
    name: 'Cosy Club',
    address: '21 Stonegate, York',
    description:
      'A relaxed grand café offering an eclectic all-day menu from brunch through dinner. '
      + 'Cosy Club blends heritage interiors with a feel-good menu of sharing plates, '
      + 'comfort mains, and indulgent desserts.',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    image: require('../../assets/restaurants/cosy-club.jpg'),
    menu: [
      { id: 'item-r03-01', name: 'Club Nachos',              category: 'APPETIZER',   price: 8.00 },
      { id: 'item-r03-02', name: 'Chicken Wings',             category: 'APPETIZER',   price: 9.00 },
      { id: 'item-r03-03', name: 'Buttermilk Chicken Burger', category: 'MAIN COURSE', price: 14.00 },
      { id: 'item-r03-04', name: 'Salmon Fillet',             category: 'MAIN COURSE', price: 17.50 },
      { id: 'item-r03-05', name: 'Superfood Salad',           category: 'MAIN COURSE', price: 12.00 },
      { id: 'item-r03-06', name: 'Sticky Toffee Pudding',     category: 'DESSERT',     price: 7.00 },
    ],
  },
  {
    id: 'rest-04',
    name: 'Prezzo Italian',
    address: '7 High Petergate, York',
    description:
      'A welcoming Italian restaurant near the Minster, serving classic pasta, '
      + 'wood-fired pizza, and hearty mains in a relaxed setting. '
      + 'A reliable choice for traditional Italian flavours in the city centre.',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    image: require('../../assets/restaurants/prezzo.jpg'),
    menu: [
      { id: 'item-r04-01', name: 'Garlic Ciabatta',           category: 'APPETIZER',   price: 4.50 },
      { id: 'item-r04-02', name: 'Bruschetta al Pomodoro',     category: 'APPETIZER',   price: 6.50 },
      { id: 'item-r04-03', name: 'Spaghetti Carbonara',        category: 'MAIN COURSE', price: 13.50 },
      { id: 'item-r04-04', name: 'Margherita Pizza',           category: 'MAIN COURSE', price: 11.00 },
      { id: 'item-r04-05', name: 'Pollo al Forno',             category: 'MAIN COURSE', price: 15.50 },
      { id: 'item-r04-06', name: 'Tiramisu',                   category: 'DESSERT',     price: 6.50 },
    ],
  },
  {
    id: 'rest-05',
    name: "L'Osteria Italiana",
    address: '78 Gillygate, York',
    description:
      "An intimate neighbourhood trattoria with a genuine Italian spirit. "
      + "Fresh pasta is made daily, the wine list is entirely Italian, "
      + "and the team brings the warmth of a family kitchen to every table.",
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    image: require('../../assets/restaurants/losteria.jpg'),
    menu: [
      { id: 'item-r05-01', name: 'Antipasto Misto',           category: 'APPETIZER',   price: 9.00 },
      { id: 'item-r05-02', name: 'Arancini al Ragù',          category: 'APPETIZER',   price: 7.50 },
      { id: 'item-r05-03', name: 'Lasagne al Forno',           category: 'MAIN COURSE', price: 13.00 },
      { id: 'item-r05-04', name: 'Risotto ai Funghi',          category: 'MAIN COURSE', price: 14.00 },
      { id: 'item-r05-05', name: 'Saltimbocca alla Romana',    category: 'MAIN COURSE', price: 18.50 },
      { id: 'item-r05-06', name: 'Panna Cotta',                category: 'DESSERT',     price: 6.50 },
    ],
  },
  {
    id: 'rest-06',
    name: 'Il Paradiso Del Cibo',
    address: '40 Gillygate, York',
    description:
      "A York institution renowned for authentic Sicilian and southern Italian cooking. "
      + "Every dish is prepared from scratch using imported Italian produce — "
      + "the handmade pasta alone is worth the visit.",
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    image: require('../../assets/restaurants/il-paradiso.jpg'),
    menu: [
      { id: 'item-r06-01', name: 'Bruschetta Mista',           category: 'APPETIZER',   price: 6.00 },
      { id: 'item-r06-02', name: 'Carpaccio di Manzo',         category: 'APPETIZER',   price: 9.50 },
      { id: 'item-r06-03', name: 'Tagliatelle al Ragù',        category: 'MAIN COURSE', price: 13.50 },
      { id: 'item-r06-04', name: 'Branzino al Forno',          category: 'MAIN COURSE', price: 19.00 },
      { id: 'item-r06-05', name: 'Osso Buco alla Milanese',    category: 'MAIN COURSE', price: 22.00 },
      { id: 'item-r06-06', name: 'Cannoli Siciliani',          category: 'DESSERT',     price: 6.50 },
    ],
  },
  {
    id: 'rest-07',
    name: 'Ambiente Tapas',
    address: '31 Goodramgate, York',
    description:
      'A lively tapas bar on Goodramgate bringing the spirit of Spanish eating to York. '
      + 'Order two or three plates each and share — the patatas bravas and '
      + 'gambas al ajillo are the perennial favourites.',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    image: require('../../assets/restaurants/ambiente.jpg'),
    menu: [
      { id: 'item-r07-01', name: 'Pan con Tomate',             category: 'APPETIZER',   price: 4.50 },
      { id: 'item-r07-02', name: 'Croquetas de Jamón',         category: 'APPETIZER',   price: 7.00 },
      { id: 'item-r07-03', name: 'Patatas Bravas',             category: 'MAIN COURSE', price: 9.00 },
      { id: 'item-r07-04', name: 'Gambas al Ajillo',           category: 'MAIN COURSE', price: 12.50 },
      { id: 'item-r07-05', name: 'Pollo al Ajillo',            category: 'MAIN COURSE', price: 14.00 },
      { id: 'item-r07-06', name: 'Churros con Chocolate',      category: 'DESSERT',     price: 6.50 },
    ],
  },
  {
    id: 'rest-08',
    name: 'Byron',
    address: '12 Coney Street, York',
    description:
      'A burger restaurant that takes its craft seriously — proper patties, '
      + 'house-made sauces, and crispy sides. A no-fuss spot for a reliably '
      + 'great burger in the middle of York\'s main shopping street.',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    image: require('../../assets/restaurants/byron.jpg'),
    menu: [
      { id: 'item-r08-01', name: 'Onion Rings',                category: 'APPETIZER',   price: 4.50 },
      { id: 'item-r08-02', name: 'Chilli Cheese Bites',        category: 'APPETIZER',   price: 5.50 },
      { id: 'item-r08-03', name: 'Classic Byron Burger',        category: 'MAIN COURSE', price: 12.00 },
      { id: 'item-r08-04', name: 'Chicken Burger',              category: 'MAIN COURSE', price: 12.50 },
      { id: 'item-r08-05', name: 'Veggie Burger',               category: 'MAIN COURSE', price: 11.00 },
      { id: 'item-r08-06', name: 'Freakshake',                  category: 'DESSERT',     price: 7.50 },
    ],
  },
  {
    id: 'rest-09',
    name: "Burgsy's",
    address: '56 Micklegate, York',
    description:
      "An independent York smash-burger joint with a loyal following. "
      + "Everything on the menu is made to order — double-smashed patties, "
      + "custom sauces, and loaded fries that regulars travel across the city for.",
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    image: require('../../assets/restaurants/burgsys.jpg'),
    menu: [
      { id: 'item-r09-01', name: 'Loaded Fries',               category: 'APPETIZER',   price: 6.50 },
      { id: 'item-r09-02', name: 'Buffalo Wings',               category: 'APPETIZER',   price: 8.50 },
      { id: 'item-r09-03', name: 'Smash Burger',                category: 'MAIN COURSE', price: 12.50 },
      { id: 'item-r09-04', name: 'Double Decker',               category: 'MAIN COURSE', price: 14.50 },
      { id: 'item-r09-05', name: 'BBQ Bacon Burger',            category: 'MAIN COURSE', price: 13.50 },
      { id: 'item-r09-06', name: 'Cookie Dough Sundae',         category: 'DESSERT',     price: 7.00 },
    ],
  },
  {
    id: 'rest-10',
    name: 'Rustique',
    address: '28 Castlegate, York',
    description:
      'A French-inspired bistro in the shadow of Clifford\'s Tower. '
      + 'Rustique keeps it simple: properly cooked steak frites, '
      + 'mussels steamed in white wine, and a short but considered wine list.',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    image: require('../../assets/restaurants/rustique.jpg'),
    menu: [
      { id: 'item-r10-01', name: 'French Onion Soup',           category: 'APPETIZER',   price: 7.50 },
      { id: 'item-r10-02', name: 'Chicken Liver Parfait',       category: 'APPETIZER',   price: 8.00 },
      { id: 'item-r10-03', name: 'Steak Frites',                category: 'MAIN COURSE', price: 19.50 },
      { id: 'item-r10-04', name: 'Moules Marinières',           category: 'MAIN COURSE', price: 16.00 },
      { id: 'item-r10-05', name: 'Croque Monsieur',             category: 'MAIN COURSE', price: 11.50 },
      { id: 'item-r10-06', name: 'Crème Brûlée',                category: 'DESSERT',     price: 7.00 },
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
