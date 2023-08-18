import React, { useContext } from 'react'
import styled from 'styled-components'
import { ButtonCheckout } from './ButtonCheckout'
import { Choices } from './Choices'
import { CountItem } from './CountItem'
import { Context } from './Functions/context'
import { formatCurrency } from './Functions/secondaryFunction'
import { useChoices } from './Hooks/useChoices'
import { useCount } from './Hooks/useCount'
import { useToppings } from './Hooks/useToppings'
import { Toppings } from './Toppings'

export const Overlay = styled.div`
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 20;
`

const Modal = styled.div`
	background-color: #fff;
	width: 600px;
	height: 600px;
`

const Banner = styled.div`
	width: 100%;
	height: 200px;
	background-image: url(${({ img }) => img});
	background-size: cover;
	background-position: center;
`

const Content = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: calc(100% - 200px);
	padding: 30px;
`

const HeaderContent = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 24px;
	font-weight: 700;
	font-family: 'Pacifico', cursive;
`

const TotalPriceItem = styled.div`
	display: flex;
	justify-content: space-between;
`
export const totalPriceItems = order => order.price * order.count

export const ModalItem = () => {
	const {
		orders: { orders, setOrders },
		openItem: { openItem, setOpenItem },
	} = useContext(Context)

	const counter = useCount(openItem.count)
	const toppings = useToppings(openItem)
	const choices = useChoices(openItem)
	const isEdit = openItem.index > -1

	const closeModal = e => {
		if (e.target.id === 'overlay') {
			setOpenItem(null)
		}
	}

	const order = {
		...openItem,
		count: counter.count,
		topping: toppings.toppings,
		choice: choices.choice,
	}

	const editOrder = () => {
		const newOrders = [...orders]
		newOrders[openItem.index] = order
		setOrders(newOrders)
		setOpenItem(null)
	}

	const addToOrder = () => {
		setOrders([...orders, order])
		setOpenItem(null)
	}

	return (
		<Overlay id='overlay' onClick={closeModal}>
			<Modal>
				<Banner img={openItem.img} />
				<Content>
					<HeaderContent>
						<div>{openItem.name}</div>
						<div>{formatCurrency(openItem.price)}</div>
					</HeaderContent>
					<CountItem {...counter} />
					{openItem.toppings && <Toppings {...toppings} />}
					{openItem.choices && <Choices {...choices} openItem={openItem} />}
					<TotalPriceItem>
						<span>Цена:</span>
						<span>{formatCurrency(totalPriceItems(order))}</span>
					</TotalPriceItem>

					<ButtonCheckout
						onClick={isEdit ? editOrder : addToOrder}
						disabled={order.choices && !order.choice}
					>
						{isEdit ? 'Редактировать' : 'Добавить'}
					</ButtonCheckout>
				</Content>
			</Modal>
		</Overlay>
	)
}
