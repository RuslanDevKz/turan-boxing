import { useState } from 'react'
import type { FormEvent } from 'react'
import { bookingPlans, programs } from './club'
import type { Direction, PlanId } from './club'

export type BookingSelection = { direction: Direction | ''; plan: PlanId | '' }

type BookingField = 'name' | 'phone' | 'direction' | 'plan' | 'date'

type Feedback = {
  selection: BookingSelection
} & (
  { field: BookingField; error: string }
  | { plan: string; date: string }
)

const dateFormatter = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long', timeZone: 'UTC' })

function firstAvailableDate() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const year = tomorrow.getFullYear()
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0')
  const day = String(tomorrow.getDate()).padStart(2, '0')
  return [year, month, day].join('-')
}

export function Booking({ selection, onSelectionChange }: {
  selection: BookingSelection
  onSelectionChange: (selection: Partial<BookingSelection>) => void
}) {
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const result = feedback?.selection === selection ? feedback : null
  const plan = bookingPlans.find(({ id }) => id === selection.plan)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const date = form.elements.namedItem('date') as HTMLInputElement

    function reportError(field: BookingField, error: string) {
      setFeedback({ selection, field, error })
      form.querySelector<HTMLElement>('#booking-' + field)?.focus()
    }

    if (name.length < 2) {
      reportError('name', 'Введите имя: не менее двух символов.')
      return
    }

    const digits = phone.replace(/\D/g, '')
    if (!/^\+?[\d\s().-]+$/.test(phone) || digits.length < 10 || digits.length > 15) {
      reportError('phone', 'Введите номер телефона: от 10 до 15 цифр, например в формате +7 (___) ___-__-__.')
      return
    }

    if (!selection.direction) {
      reportError('direction', 'Выберите направление тренировок.')
      return
    }

    if (!plan) {
      reportError('plan', 'Выберите абонемент.')
      return
    }

    if (!Number.isFinite(date.valueAsNumber) || date.valueAsNumber < Date.parse(firstAvailableDate())) {
      reportError('date', 'Выберите завтрашнюю или более позднюю дату.')
      return
    }

    setFeedback({ selection, plan: plan.label, date: dateFormatter.format(date.valueAsNumber) })
  }

  function errorAttributes(field: BookingField) {
    const invalid = result !== null && 'field' in result && result.field === field
    return {
      'aria-invalid': invalid,
      'aria-describedby': invalid ? 'booking-result' : undefined,
    }
  }

  return (
    <form className="booking-form" noValidate onSubmit={submit} onChange={() => setFeedback(null)}>
      <h3>Пробная тренировка</h3>
      <p id="booking-mode" className="body-copy">Демонстрационный режим. Форма проверяет поля локально, данные не отправляются.</p>
      <label htmlFor="booking-name">Имя</label>
      <input id="booking-name" name="name" autoComplete="name" required maxLength={80} {...errorAttributes('name')} />
      <label htmlFor="booking-phone">Телефон</label>
      <input id="booking-phone" name="phone" type="tel" autoComplete="tel" required maxLength={26} placeholder="+7 (___) ___-__-__" {...errorAttributes('phone')} />
      <label htmlFor="booking-direction">Направление тренировок</label>
      <select id="booking-direction" name="direction" required value={selection.direction} onChange={(event) => {
        const direction = programs.find(({ id }) => id === event.target.value)
        onSelectionChange({ direction: direction?.id ?? '' })
      }} {...errorAttributes('direction')}>
        <option value="" disabled>Выберите направление</option>
        {programs.map(({ id, title }) => <option key={id} value={id}>{title}</option>)}
      </select>
      <label htmlFor="booking-plan">Выберите абонемент</label>
      <select id="booking-plan" name="plan" required value={selection.plan} onChange={(event) => {
        const selectedPlan = bookingPlans.find(({ id }) => id === event.target.value)
        onSelectionChange({ plan: selectedPlan?.id ?? '' })
      }} {...errorAttributes('plan')}>
        <option value="" disabled>Выберите абонемент</option>
        {bookingPlans.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
      </select>
      {plan && <p className="booking-plan">{plan.label}</p>}
      <label htmlFor="booking-date">Желаемая дата тренировки</label>
      <input id="booking-date" name="date" type="date" min={firstAvailableDate()} required {...errorAttributes('date')} />
      <button className="action" type="submit" aria-describedby="booking-mode">Проверить заявку</button>
      <div id="booking-result" className="booking-result" role="status">
        {result && ('error' in result ? result.error : (
          <>
            <p>Данные прошли проверку. Заявка не отправлена, тренировка не забронирована.</p>
            <p>Абонемент: {result.plan}</p>
            <p>Желаемая дата: {result.date}</p>
          </>
        ))}
      </div>
    </form>
  )
}
