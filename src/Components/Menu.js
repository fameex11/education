import React from 'react'
import styled from 'styled-components'
import { Banner } from './Banner'
import { useFetch } from './Hooks/useFetch'
import { ListItem } from './ListItem'

const MenuStyled = styled.main`
	background-color: #ccc;
	margin-top: 80px;
	margin-left: 380px;
`

const SectionMenu = styled.section`
	padding: 30px;
`

export const Menu = () => {
	const res = useFetch()

	return (
		<MenuStyled>
			<Banner />
			{res.response ? (
				<>
					<SectionMenu>
						<h2>Бургеры</h2>
						<ListItem itemList={res.response.burger} />
					</SectionMenu>

					<SectionMenu>
						<h2>Закуски / Напитки</h2>
						<ListItem itemList={res.response.other} />
					</SectionMenu>
				</>
			) : (
				<div>Загрузка</div>
			)}
		</MenuStyled>
	)
}
