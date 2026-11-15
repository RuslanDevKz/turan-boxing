export const assets = import.meta.env.BASE_URL + 'assets/'
export const clubName = 'TURAN BOXING'
export const clubPhoto = (name: string) => assets + 'club/' + name + '.jpg'

export const sections = [
  ['home', 'Главная'],
  ['about', 'О клубе'],
  ['training', 'Тренировки'],
  ['coaches', 'Тренеры'],
  ['prices', 'Цены'],
  ['schedule', 'Расписание'],
  ['gallery', 'Галерея'],
  ['reviews', 'Отзывы'],
  ['contacts', 'Контакты'],
] as const

export const programs = [
  { id: 'beginner', title: 'Бокс для начинающих', description: 'Освой стойку, защиту и первые комбинации. Нагрузку подберём под твой уровень.' },
  { id: 'group', title: 'Групповые тренировки', description: 'Техника, работа на мешках и общая физическая подготовка в команде.' },
  { id: 'personal', title: 'Персональные тренировки', description: 'Занятия один на один с тренером по плану, который учитывает твои цели.' },
  { id: 'youth', title: 'Бокс для детей и подростков', description: 'Координация, дисциплина и основы бокса в группе под присмотром тренера.' },
] as const

export type Direction = (typeof programs)[number]['id']

export const coaches = [
  { image: 'coach-arman', name: 'Арман Садыков', specialty: 'Бокс для начинающих', description: 'Опыт ведения вводных групп: от постановки стойки до первых упражнений на защиту.' },
  { image: 'coach-aliya', name: 'Алия Нурланова', specialty: 'Детские и подростковые группы', description: 'Опыт работы с юными спортсменами. Развивает координацию и баланс через упражнения в парах.' },
  { image: 'coach-daniyar', name: 'Данияр Нурланов', specialty: 'Персональные тренировки', description: 'Опыт индивидуальной подготовки. Подбирает упражнения на лапах и помогает отработать комбинации.' },
]

export const plans = [
  { id: 'trial', title: 'Первая тренировка', price: 'БЕСПЛАТНО', detail: 'Первое пробное групповое занятие бесплатно. Познакомьтесь с клубом и тренером.', free: true },
  { id: 'group-8', title: '8 занятий', price: '24 000', description: 'Восемь групповых занятий на 30 дней', detail: 'Подходит для ритма две тренировки в неделю.', popular: true },
  { id: 'group-12', title: '12 занятий', price: '32 000', description: 'Двенадцать групповых занятий на 30 дней', detail: 'Для тех, кто готов тренироваться трижды в неделю.' },
] as const

export const personalPlan = {
  id: 'personal-monthly',
  title: 'Персональные тренировки',
  price: '80 000',
  detail: '12 индивидуальных занятий с персональным тренером. График тренировок согласовывается с учётом ваших пожеланий.',
} as const

export type PlanId = (typeof plans)[number]['id'] | typeof personalPlan.id

export const bookingPlans: { id: PlanId; label: string }[] = [
  ...plans.map((plan) => ({
    id: plan.id,
    label: plan.id === 'trial' ? 'Первая пробная тренировка — бесплатно' : plan.title + ' — ' + plan.price + ' ₸',
  })),
  { id: personalPlan.id, label: personalPlan.title + ', 12 занятий в месяц — ' + personalPlan.price + ' ₸' },
]

export const schedule = [
  { day: 'Понедельник', sessions: [['18:00', 'Начинающие'], ['19:30', 'Групповая']] },
  { day: 'Вторник', sessions: [['17:00', 'Дети и подростки'], ['19:00', 'Персональная']] },
  { day: 'Среда', sessions: [['18:00', 'Начинающие'], ['19:30', 'Групповая']] },
  { day: 'Четверг', sessions: [['17:00', 'Дети и подростки'], ['19:00', 'Персональная']] },
  { day: 'Пятница', sessions: [['18:00', 'Начинающие'], ['19:30', 'Групповая']] },
  { day: 'Суббота', sessions: [['11:00', 'Групповая'], ['13:00', 'Персональная']] },
  { day: 'Воскресенье', sessions: [] },
]

export const gallery = [
  { image: 'gym', caption: 'Ринг и тренировочный зал' },
  { image: 'group', caption: 'Групповая работа на мешках' },
  { image: 'gear', caption: 'Перчатки, бинты и скакалка' },
  { image: 'beginner', caption: 'Отработка стойки и защиты' },
  { image: 'personal', caption: 'Работа на лапах с тренером' },
  { image: 'youth', caption: 'Тренировка подростковой группы' },
]

export const reviews = [
  { name: 'Марат Сейтов', avatar: 'review-marat', program: 'Бокс для начинающих', quote: 'На первой тренировке разобрали стойку и объяснили, куда ставить ноги. Уже к концу занятия получилось собрать первую комбинацию.' },
  { name: 'Виктория Петрова', avatar: 'review-viktoria', program: 'Групповые тренировки', quote: 'Мне нравится групповой ритм. Мы работаем вместе, а тренер успевает подсказать каждому, где поправить технику.' },
  { name: 'Айнур Ермекова', avatar: 'review-ainur', program: 'Бокс для детей и подростков', quote: 'Дочь ждёт тренировок и показывает дома упражнения на координацию. Ей нравится, что в группе всё объясняют спокойно.' },
]
