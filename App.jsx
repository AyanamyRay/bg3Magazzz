import { useState } from 'react'
import './App.css'

const ITEMS = [
  { id: 1,  name: 'Зелье лечения',          category: 'расходники', rarity: 'common',     price: 50,   discount: 0,    image: '/bg3_potion_healing.png',          desc: 'Восстанавливает 2d4+2 HP.' },
  { id: 2,  name: 'Зелье великого лечения',  category: 'расходники', rarity: 'uncommon',   price: 100,  discount: 0.1,  image: '/bg3_potion_greater_healing.png',  desc: 'Восстанавливает 4d4+4 HP.' },
  { id: 3,  name: 'Зелье превосходного лечения', category: 'расходники', rarity: 'rare', price: 200,  discount: 0,    image: '/bg3_potion_superior_healing.png', desc: 'Восстанавливает 8d4+8 HP.' },
  { id: 4,  name: 'Зелье невидимости',       category: 'расходники', rarity: 'rare',       price: 200,  discount: 0.2,  image: '/bg3_potion_invisibility.png',      desc: 'Невидимость до конца следующего хода.' },
  { id: 5,  name: 'Зелье скорости',          category: 'расходники', rarity: 'uncommon',   price: 150,  discount: 0,    image: '/bg3_potion_speed.png',            desc: 'Даёт эффект «Ускорение».' },
  { id: 6,  name: 'Зелье полёта',            category: 'расходники', rarity: 'very-rare',   price: 300,  discount: 0.15, image: '/bg3_potion_flying.png',            desc: 'Позволяет летать до следующего отдыха.' },
  { id: 7,  name: 'Зелье жизненной силы',    category: 'расходники', rarity: 'uncommon',   price: 120,  discount: 0,    image: '/bg3_potion_vitality.png',          desc: 'Восстанавливает максимум HP.' },
  { id: 8,  name: 'Противоядие',             category: 'расходники', rarity: 'common',     price: 25,   discount: 0,    image: '/bg3_antidote.png',                 desc: 'Снимает отравление.' },
  { id: 9,  name: 'Свиток Огненного снаряда', category: 'расходники', rarity: 'common',   price: 40,   discount: 0,    image: '/bg3_scroll_firebolt.png',         desc: 'Снаряд огня, 1d10 урона.' },
  { id: 10, name: 'Свиток лечения',          category: 'расходники', rarity: 'common',     price: 75,   discount: 0.1,  image: '/bg3_scroll_healing.png',           desc: 'Восстанавливает HP цели.' },
  { id: 11, name: 'Свиток Ускорения',        category: 'расходники', rarity: 'rare',       price: 180,  discount: 0,    image: '/bg3_scroll_haste.png',             desc: 'Даёт дополнительное действие.' },
  { id: 12, name: 'Свиток Воскрешения',      category: 'расходники', rarity: 'very-rare',   price: 250,  discount: 0.15, image: '/bg3_scroll_revivify.png',         desc: 'Воскрешает павшего союзника.' },
  { id: 13, name: 'Свиток Дробления',        category: 'расходники', rarity: 'uncommon',   price: 100,  discount: 0,    image: '/bg3_scroll_shatter.png',          desc: 'Звуковой взрыв, 3d8 урона.' },
  { id: 14, name: 'Кинжал',                  category: 'оружие',    rarity: 'common',     price: 50,   discount: 0,    image: '/bg3_dagger.png',                   desc: '1d4 колющего урона, лёгкое.' },
  { id: 15, name: 'Короткий меч',            category: 'оружие',    rarity: 'common',     price: 80,   discount: 0,    image: '/bg3_shortsword.png',                desc: '1d6 рубящего урона.' },
  { id: 16, name: 'Длинный меч',             category: 'оружие',    rarity: 'uncommon',   price: 150,  discount: 0,    image: '/bg3_longsword.png',                desc: '1d8 рубящего урона, универсальное.' },
  { id: 17, name: 'Рапира',                  category: 'оружие',    rarity: 'uncommon',   price: 175,  discount: 0.1,  image: '/bg3_rapier.png',                   desc: '1d8 колющего урона, finesse.' },
  { id: 18, name: 'Боевой топор',            category: 'оружие',    rarity: 'uncommon',   price: 200,  discount: 0,    image: '/bg3_battleaxe.png',                desc: '1d8 рубящего урона.' },
  { id: 19, name: 'Пика',                    category: 'оружие',    rarity: 'common',     price: 90,   discount: 0,    image: '/bg3_pike.png',                     desc: '1d10 колющего урона, тяжёлое.' },
  { id: 20, name: 'Лук Титанов',             category: 'оружие',    rarity: 'very-rare',   price: 558,  discount: 0,    image: '/bg3_titanstring_bow.png',          desc: '+1 к урону, использует модификатор Силы.' },
  { id: 21, name: 'Серебряный меч Астрала',  category: 'оружие',    rarity: 'legendary',   price: 2000, discount: 0.25, image: '/bg3_silver_sword.png',             desc: 'Действие по площади, +1d8 психического урона.' },
  { id: 22, name: 'Кожаная броня',           category: 'броня',     rarity: 'common',     price: 45,   discount: 0,    image: '/bg3_leather_armor.png',            desc: 'Класс брони 11 + модиф. Ловкости.' },
  { id: 23, name: 'Кольчуга',                category: 'броня',     rarity: 'uncommon',   price: 150,  discount: 0,    image: '/bg3_chain_mail.png',               desc: 'Класс брони 16.' },
  { id: 24, name: 'Пластинчатая броня',      category: 'броня',     rarity: 'rare',       price: 1500, discount: 0,    image: '/bg3_plate_armor.png',               desc: 'Класс брони 18.' },
  { id: 25, name: 'Адамантитовая броня',     category: 'броня',     rarity: 'very-rare',   price: 2200, discount: 0.1,  image: '/bg3_adamantine_armor.png',         desc: 'Крит по вам становится обычным попаданием.' },
  { id: 26, name: 'Броня Адского пламени',   category: 'броня',     rarity: 'legendary',   price: 5000, discount: 0.3,  image: '/bg3_helldusk_armor.png',           desc: 'Сопротивление огню, полёт, +1 к CS.' },
  { id: 27, name: 'Щит',                     category: 'броня',     rarity: 'common',     price: 30,   discount: 0,    image: '/bg3_shield.png',                   desc: '+2 к классу брони.' },
  { id: 28, name: 'Перчатки воровства',      category: 'броня',     rarity: 'uncommon',   price: 120,  discount: 0,    image: '/bg3_gloves_thievery.png',          desc: '+2 к Sleight of Hand.' },
  { id: 29, name: 'Кольцо прыжков',          category: 'предметы',  rarity: 'uncommon',   price: 110,  discount: 0,    image: '/bg3_ring_jumping.png',            desc: 'Позволяет прыгать дальше.' },
  { id: 30, name: 'Кольцо каустической бравады', category: 'предметы', rarity: 'rare',   price: 180,  discount: 0,    image: '/bg3_ring_caustic.png',             desc: '+1 к спасброскам от кислоты.' },
  { id: 31, name: 'Амулет восстановления',   category: 'предметы',  rarity: 'rare',       price: 250,  discount: 0.1,  image: '/bg3_amulet_restoration.png',       desc: 'Один слот заклинания восстанавливается.' },
  { id: 32, name: 'Жемчужина силы',          category: 'предметы',  rarity: 'uncommon',   price: 90,   discount: 0.15, image: '/bg3_pearl_power.png',             desc: 'Действие: восстановить ячейку заклинания.' },
  { id: 33, name: 'Сапоги бури',             category: 'предметы',  rarity: 'very-rare',   price: 300,  discount: 0,    image: '/bg3_boots_storm.png',              desc: 'Игнорирует сложную местность.' },
  { id: 34, name: 'Шапка меткости',          category: 'предметы',  rarity: 'uncommon',   price: 48,   discount: 0.5,  image: '/bg3_marksmanship_hat.png',         desc: '+1 к атакам дальнего боя.' },
  { id: 35, name: 'Перчатки раздавливания', category: 'предметы',  rarity: 'rare',       price: 220,  discount: 0,    image: '/bg3_gloves_crushing.png',          desc: 'Удар кулаком сбивает с ног.' },
  { id: 36, name: 'Кольцо грома',            category: 'предметы',  rarity: 'rare',       price: 150,  discount: 0.05, image: '/bg3_ring_thunder.png',             desc: 'При уроне — волна грома 1d8.' },
];

const RARITY_LABELS = {
  common: 'Обычный',
  uncommon: 'Необычный',
  rare: 'Редкий',
  'very-rare': 'Очень редкий',
  legendary: 'Легендарный',
};

function App() {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState('все');
  const [sort, setSort] = useState('по умолчанию');
  const [search, setSearch] = useState('');

  const categories = ['все', 'расходники', 'оружие', 'броня', 'предметы'];

  let filtered = ITEMS.filter((item) => {
    if (category !== 'все' && item.category !== category) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (sort === 'дешевле') filtered = [...filtered].sort((a, b) => a.price * (1 - a.discount) - b.price * (1 - b.discount));
  if (sort === 'дороже') filtered = [...filtered].sort((a, b) => b.price * (1 - b.discount) - a.price * (1 - a.discount));
  if (sort === 'со скидкой') filtered = [...filtered].sort((a, b) => b.discount - a.discount);
  if (sort === 'по названию') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsOpen(true);
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * (1 - item.discount) * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="app">
      <header className="header">
        <h1> Baldur's Gate 3 Маркет</h1>
        <button className="cart-btn" onClick={() => setIsOpen(true)}>
           Корзина [{cartCount}]
        </button>
      </header>

      <div className="controls">
        <div className="category-btns">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat === 'все' ? 'Все' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <input
          className="search-input"
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="по умолчанию">По умолчанию</option>
          <option value="дешевле">Сначала дешёвые</option>
          <option value="дороже">Сначала дорогие</option>
          <option value="со скидкой">Со скидкой</option>
          <option value="по названию">По названию</option>
        </select>
      </div>

      <div className="shop">
        {filtered.map((item) => {
          const finalPrice = Math.round(item.price * (1 - item.discount));
          return (
            <div className="card" key={item.id}>
              {item.image ? (
                <img className="card-img" src={item.image} alt={item.name} onError={(e) => { e.target.style.display = 'none'; }} />
              ) : (
                <div className="card-img-placeholder">Нет фото</div>
              )}
              <div className="card-body">
                <div className={`card-rarity rarity-${item.rarity}`}>{RARITY_LABELS[item.rarity]}</div>
                <div className="card-name">{item.name}</div>
                <div className="card-desc">{item.desc}</div>
                <div className="card-price">
                  {item.discount > 0 && <span className="price-old">{item.price} зм</span>}
                  <span className="price-new">{finalPrice} зм</span>
                  {item.discount > 0 && <span className="discount-badge">−{Math.round(item.discount * 100)}%</span>}
                </div>
                <button className="add-btn" onClick={() => addToCart(item)}>В корзину</button>
              </div>
            </div>
          );
        })}
      </div>

      {isOpen && (
        <>
          <div className="cart-overlay" onClick={() => setIsOpen(false)} />
          <div className="cart-panel">
            <div className="cart-header">
              <h2>Корзина</h2>
              <button className="cart-close" onClick={() => setIsOpen(false)}>✕</button>
            </div>
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="cart-empty">Корзина пуста</div>
              ) : (
                cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img className="cart-item-img" src={item.image} alt={item.name} onError={(e) => { e.target.style.visibility = 'hidden'; }} />
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-price">
                        {item.discount > 0 && <span className="price-old" style={{ fontSize: '12px' }}>{item.price}</span>}
                        {Math.round(item.price * (1 - item.discount))} зм × {item.qty}
                      </div>
                      <div className="cart-item-controls">
                        <button className="qty-btn" onClick={() => changeQty(item.id, -1)}>−</button>
                        <span>{item.qty}</span>
                        <button className="qty-btn" onClick={() => changeQty(item.id, 1)}>+</button>
                        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Удалить</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="cart-footer">
              <div className="cart-total">
                <span>Итого:</span>
                <span>{Math.round(total)} зм</span>
              </div>
              <button className="checkout-btn">Оформить заказ</button>
            </div>
          </div>
        </>
      )}

      <footer className="footer">
        BG3 Маркет — фанатский проект. Данные из открытых вики Baldur's Gate 3.
      </footer>
    </div>
  );
}

export default App;
