import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import { Calculator, numbers, operations, equal, del } from '../src/Calculator'

describe('Calculator', () => {
  afterEach(cleanup)
  it('Should render', () => {
    render(<Calculator />)
  })

  it('Should render title correctly', () => {
    render(<Calculator />)

    screen.getByText('Calculator')
  })

  it('Should render numbers', () => {
    render(<Calculator />)
    numbers.forEach((num) => {
      screen.getByText(num)
    })
  })

  it('Should render 2 groups', () => {
    render(<Calculator />)

    const groups = screen.getAllByRole('grid')
    expect(groups).toHaveLength(2)
  })

  it('should render operations', () => {
    render(<Calculator />)

    operations.forEach((operation) => {
      screen.getByText(operation)
    })
  })

  it('Should render equal sign', () => {
    render(<Calculator />)
    screen.getByText('=')
  })

  it('Should render an input', () => {
    render(<Calculator />)
    screen.getByRole('textbox')
  })

  it('Should user input after clicking a number', () => {
    render(<Calculator />)

    const one = screen.getByText('1')
    fireEvent.click(one)
    const input = screen.getByRole('textbox')
    expect(input.value).toBe('1')
  })

  it('Should user input after clicking several number', () => {
    render(<Calculator />)

    const one = screen.getByText('1')
    fireEvent.click(one)

    const two = screen.getByText('2')
    fireEvent.click(two)

    const three = screen.getByText('3')
    fireEvent.click(three)

    const input = screen.getByRole('textbox')
    expect(input.value).toBe('123')
  })

  it('Should show use input after clicking numbers and operations signs', () => {
    render(<Calculator />)

    const one = screen.getByText('1')
    const plus = screen.getByText('+')

    fireEvent.click(one)
    fireEvent.click(plus)
    fireEvent.click(one)

    const input = screen.getByRole('textbox')
    expect(input.value).toBe('1+1')
  })

  it('Should render the result of the operation', () => {
    render(<Calculator />)

    const one = screen.getByText('1')
    const plus = screen.getByText('+')
    const equalSign = screen.getByText(equal)

    fireEvent.click(one)
    fireEvent.click(plus)
    fireEvent.click(one)
    fireEvent.click(equalSign)

    const input = screen.getByRole('textbox')
    expect(input.value).toBe('2')
  })

  it('Should render a cancel button', () => {
    render(<Calculator />)

    screen.getByText(del)
  })

  it('Should let the user delete a past operation to make a new one', () => {
    render(<Calculator />)

    const one = screen.getByText('1')
    const two = screen.getByText('2')
    const plus = screen.getByText('+')
    const equalSign = screen.getByText(equal)
    const d = screen.getByText(del)

    fireEvent.click(one)
    fireEvent.click(plus)
    fireEvent.click(one)
    fireEvent.click(equalSign)
    fireEvent.click(d)

    fireEvent.click(two)
    fireEvent.click(plus)
    fireEvent.click(two)
    fireEvent.click(equalSign)

    const input = screen.getByRole('textbox')
    expect(input.value).toBe('4')
  })
})
