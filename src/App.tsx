import { useRef, useState } from 'react'
import { assets, clubName, clubPhoto, coaches, gallery, personalPlan, plans, programs, reviews, schedule, sections } from './club'
import { Booking } from './Booking'
import type { BookingSelection } from './Booking'
import { PhotoGallery } from './PhotoGallery'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuToggle = useRef<HTMLButtonElement>(null)

  return (
    <header
      className="site-header relative z-10 flex items-center justify-between"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) {
          setMenuOpen(false)
          menuToggle.current?.focus()
        }
      }}
    >
      <a className="brand flex shrink-0 items-center" href="#home" onClick={() => setMenuOpen(false)}>
        <img src={assets + 'logo.svg'} alt="" width="79" height="83" />
        {clubName}
      </a>
      <button
        ref={menuToggle}
        type="button"
        className="menu-toggle"
        aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true" />
      </button>
      <nav id="main-navigation" className="header-nav" aria-label="Главное меню" data-open={menuOpen}>
        {sections.map(([id, label]) => (
          <a key={id} href={'#' + id} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container flex flex-wrap items-center justify-between gap-x-10 gap-y-5">
        <div className="footer-identity">
          <a className="brand flex items-center" href="#home">
            <img src={assets + 'logo.svg'} alt="" width="79" height="83" />
            {clubName}
          </a>
          <div className="footer-contact">
            <div className="footer-contact-links">
              <a className="footer-phone" href="tel:+77000000000" aria-describedby="footer-number-note">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 3H5a2 2 0 0 0-2 2 16 16 0 0 0 16 16 2 2 0 0 0 2-2v-3l-5-2-2 2a12 12 0 0 1-6-6l2-2z" />
                </svg>
                +7 (700) 000-00-00
              </a>
              <a className="footer-whatsapp" href="https://wa.me/77000000000" aria-label="Открыть чат в WhatsApp" aria-describedby="footer-number-note">
                <svg viewBox="0 0 24 24" width="25" height="25" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2a9.94 9.94 0 0 0-8.56 15.02L2 22l5.12-1.35A9.96 9.96 0 1 0 12.04 2zm0 18.15a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.06.8.83-2.97-.2-.31a8.23 8.23 0 1 1 6.91 3.8zm4.55-6.16c-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.13-.57.12-.16.25-.64.81-.79.98-.14.16-.29.18-.54.06a6.74 6.74 0 0 1-1.99-1.23 7.44 7.44 0 0 1-1.38-1.73c-.15-.25-.02-.38.1-.5.11-.12.25-.29.38-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.07-.13-.57-1.36-.77-1.86-.2-.48-.41-.42-.57-.43h-.48c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07 0 1.23.89 2.42 1.02 2.58.12.17 1.75 2.68 4.24 3.75.6.26 1.06.41 1.41.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.59.21-1.09.14-1.19-.06-.11-.23-.17-.48-.29z" />
                </svg>
              </a>
            </div>
            <p id="footer-number-note">Демонстрационный номер</p>
          </div>
        </div>
        <p className="body-copy">Учебный проект боксёрского клуба</p>
        <a className="text-link" href="#home">Наверх <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  )
}

export default function App() {
  const [booking, setBooking] = useState<BookingSelection>({
    direction: '',
    plan: '',
  })

  function chooseBooking(selection: Partial<BookingSelection>) {
    setBooking((previous) => ({ ...previous, ...selection }))
  }

  return (
    <>
      <main>
        <section id="home" className="hero relative isolate bg-black" aria-labelledby="hero-title">
          <div className="hero-art" aria-hidden="true">
            <img
              className="hero-photo"
              src={assets + 'club/hero-boxer.png'}
              alt=""
              width="921"
              height="550"
              fetchPriority="high"
            />
          </div>
          <div className="page-container">
            <Header />
            <div className="hero-content">
              <h1 id="hero-title" className="hero-title">
                Бейся как <br />
                <span className="text-accent">чемпион</span>
              </h1>
              <p className="body-copy hero-description">Бокс для любого уровня. От первой стойки до уверенной работы на ринге.</p>
              <a className="action" href="#contacts">Записаться на тренировку</a>
            </div>
          </div>
        </section>

        <section id="about" className="club-section" aria-labelledby="about-title">
          <div className="page-container club-split">
            <div className="section-intro">
              <h2 id="about-title">О нашем <span>клубе</span></h2>
              <p className="body-copy">В {clubName} можно начать с нуля, вернуться после перерыва или улучшить технику. В зале есть ринг, зона с мешками и место для разминки и силовой работы.</p>
              <p className="body-copy">Тренер подбирает нагрузку под твой уровень. Сначала разбираем движение и защиту, затем добавляем темп, работу в парах и более сложные комбинации.</p>
              <a className="text-link" href="#training">Посмотреть тренировки <span aria-hidden="true">↗</span></a>
            </div>
            <img className="club-feature" src={clubPhoto('gym')} alt="Боксёрский ринг и зона с мешками в зале с синей подсветкой" width="508" height="508" loading="lazy" />
          </div>
        </section>

        <section id="training" className="club-section panel-section" aria-labelledby="training-title">
          <div className="page-container">
            <div className="section-intro">
              <h2 id="training-title">Направления <span>тренировок</span></h2>
              <p className="body-copy">Выбери формат с учётом своего опыта, возраста и цели.</p>
            </div>
            <div className="program-grid">
              {programs.map((program) => (
                <article className="club-card" key={program.id}>
                  <img className="card-photo" src={clubPhoto(program.id)} alt="" width="508" height="508" loading="lazy" />
                  <div className="card-content">
                    <h3>{program.title}</h3>
                    <p className="body-copy">{program.description}</p>
                    <a className="text-link card-link" href="#contacts" onClick={() => chooseBooking({ direction: program.id })}>
                      Записаться <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="coaches" className="club-section" aria-labelledby="coaches-title">
          <div className="page-container">
            <div className="section-intro">
              <h2 id="coaches-title">Наши <span>тренеры</span></h2>
              <p className="body-copy">Демонстрационные профили. Имена и специализации приведены для примера, портреты сгенерированы.</p>
            </div>
            <div className="three-grid">
              {coaches.map((coach) => (
                <article className="club-card" key={coach.name}>
                  <img className="card-photo coach-photo" src={clubPhoto(coach.image)} alt="" width="508" height="1020" loading="lazy" />
                  <div className="card-content">
                    <h3>{coach.name}</h3>
                    <p className="card-specialty">{coach.specialty}</p>
                    <p className="body-copy">{coach.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="prices" className="club-section panel-section" aria-labelledby="prices-title">
          <div className="page-container">
            <div className="section-intro">
              <h2 id="prices-title">Абонементы <span>и цены</span></h2>
              <p className="body-copy">Примерные цены в тенге для учебной версии сайта.</p>
            </div>
            <div className="three-grid">
              {plans.map((plan) => (
                <article className="club-card price-card" data-popular={'popular' in plan} key={plan.id}>
                  {'popular' in plan && <p className="plan-label">Популярный тариф</p>}
                  <h3>{plan.title}</h3>
                  <p className="price" data-free={plan.id === 'trial'}>
                    {plan.price}{plan.id !== 'trial' && <> <small>₸</small></>}
                  </p>
                  {plan.id !== 'trial' && <p className="card-specialty">{plan.description}</p>}
                  <p className="body-copy">{plan.detail}</p>
                  <a className="action" href="#contacts" aria-label={'Выбрать: ' + plan.title} onClick={() => chooseBooking({ plan: plan.id })}>Выбрать</a>
                </article>
              ))}
            </div>
            <div className="personal-plan">
              <div>
                <h3>{personalPlan.title}</h3>
                <p className="personal-price">{personalPlan.price} ₸ <span>/ месяц</span></p>
                <p className="body-copy">{personalPlan.detail}</p>
              </div>
              <a className="text-link" href="#contacts" aria-label={'Выбрать: ' + personalPlan.title} onClick={() => chooseBooking({ plan: personalPlan.id })}>
                Выбрать <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section id="schedule" className="club-section" aria-labelledby="schedule-title">
          <div className="page-container">
            <div className="section-intro">
              <h2 id="schedule-title">Расписание <span>тренировок</span></h2>
              <p className="body-copy">Пример расписания на неделю. Время указано по Астане.</p>
            </div>
            <dl className="schedule-list">
              {schedule.map(({ day, sessions }) => (
                <div className="schedule-row" key={day}>
                  <dt>{day}</dt>
                  <dd>
                    {sessions.length > 0 ? (
                      <ul>{sessions.map(([time, group]) => (
                        <li key={time}><time dateTime={time}>{time}</time> <span>{group}</span></li>
                      ))}</ul>
                    ) : <span className="body-copy">Выходной</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="gallery" className="club-section panel-section" aria-labelledby="gallery-title">
          <div className="page-container">
            <div className="section-intro">
              <h2 id="gallery-title">Фото<span>галерея</span></h2>
              <p className="body-copy">Ринг, тренировки и экипировка. Снимки созданы для учебного проекта.</p>
            </div>
            <PhotoGallery photos={gallery} />
          </div>
        </section>

        <section id="reviews" className="club-section" aria-labelledby="reviews-title">
          <div className="page-container">
            <div className="section-intro">
              <h2 id="reviews-title">Отзывы</h2>
              <p className="reviews-note">Демонстрационные отзывы</p>
            </div>
            <div className="three-grid">
              {reviews.map((review) => (
                <figure className="club-card review-card" key={review.name}>
                  <blockquote className="body-copy">«{review.quote}»</blockquote>
                  <figcaption>
                    <img className="review-avatar" src={clubPhoto(review.avatar)} alt="" width="42" height="42" loading="lazy" />
                    <div className="review-author">
                      <strong>{review.name}</strong>
                      <span className="body-copy">{review.program}</span>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className="club-section booking-section" aria-labelledby="contacts-title">
          <div className="page-container club-split">
            <div className="section-intro">
              <h2 id="contacts-title">Запишись на <span>пробную тренировку</span></h2>
              <p className="body-copy">Выбери направление и попробуй заполнить форму так, как сделал бы это перед первым визитом.</p>
              <div className="contact-details">
                <h3>{clubName}</h3>
                <p className="body-copy">Демонстрационный адрес для учебного проекта</p>
                <address>Казахстан, г. Астана, район Нура, улица Әнет баба, 15<br />club@turanboxing.example</address>
              </div>
            </div>
            <Booking selection={booking} onSelectionChange={chooseBooking} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
