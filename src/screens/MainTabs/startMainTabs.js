import { Navigation } from 'react-native-navigation';
// import { Icon } from 'native-base';

const startTabs = () => {

	Navigation.startTabBasedApp({
	tabs: [
			{
				screen: "petLuvs.FirstScreen",
				label: 'FirstScreen',
				title: 'FirstScreen',
			},
			{
				screen: "petLuvs.SecondScreen",
				label: 'SecondScreen',
				title: 'SecondScreen',
			},
			{
				screen: "petLuvs.ThirdScreen",
				label: 'ThirdScreen',
				title: 'ThirdScreen'
			}
		]
	})
};

export default startTabs;