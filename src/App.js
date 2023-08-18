import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import React from 'react'
import { Context } from './Components/Functions/context'
import { GlobalStyle } from './Components/GlobalStyle'
import { useAuth } from './Components/Hooks/useAuth'
import { useOpenItem } from './Components/Hooks/useOpenItem'
import { useOrderConfirm } from './Components/Hooks/useOrderConfirm'
import { useOrders } from './Components/Hooks/useOrders'
import { useTitle } from './Components/Hooks/useTitle'
import { Menu } from './Components/Menu'
import { ModalItem } from './Components/ModalItem'
import { NavBar } from './Components/NavBar'
import { Order } from './Components/Order'
import { OrderConfirm } from './Components/OrderConfirm'

const firebaseConfig = {
	apiKey: 'AIzaSyB3ciz0mGQMdqTgKGpkSy_VnlM7SbjG5oE',
	authDomain: 'mrdonalds-7d332.firebaseapp.com',
	projectId: 'mrdonalds-7d332',
	storageBucket: 'mrdonalds-7d332.appspot.com',
	messagingSenderId: '673092592632',
	appId: '1:673092592632:web:60f011ba525811307d2c0d',
}

firebase.initializeApp(firebaseConfig)

function App() {
	const authFirebase = firebase.auth
	const auth = useAuth(authFirebase)
	const openItem = useOpenItem()
	const orders = useOrders()
	const orderConfirm = useOrderConfirm()
	useTitle(openItem.openItem)

	return (
		<Context.Provider
			value={{
				auth,
				openItem,
				orders,
				orderConfirm,
				firebaseDatabase: firebase.database,
			}}
		>
			<GlobalStyle />
			<NavBar />
			<Order />
			<Menu />
			{openItem.openItem && <ModalItem />}
			{orderConfirm.openOrderConfirm && <OrderConfirm />}
		</Context.Provider>
	)
}

export default App
