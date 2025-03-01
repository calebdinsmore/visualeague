'use client'
import {
	Box,
	Grid,
	GridItem,
	SimpleGrid,
	Spinner,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from '@chakra-ui/react'
import React from 'react'
import {useContext} from 'react'
import League from '../../../../classes/custom/League'
import DraftPickCard from '../../../../components/cards/DraftPickCard'
import GenericStatCard from '../../../../components/cards/statcards/GenericStatCard'
import DraftValueBarChart from '../../../../components/charts/bar/DraftValueBarChart'
import DraftBoard from '../../../../components/groups/DraftBoard'
import DraftPageStatGroup from '../../../../components/groups/stats/DraftPageStatGroup'
import DraftValueTable from '../../../../components/tables/DraftValueTable'
import {LeagueContext} from '../../../../contexts/LeagueContext'

const Page = () => {
	const [context, setContext] = useContext(LeagueContext)
	const desktopGrid = `
	"draft_cards draft_cards"
	"draft_table draft_chart"`

	const mobileGrid = `"draft_cards"
						"draft_chart"
						"draft_table"`
	if (!context.settings) return <Spinner />

	return (
			<Tabs isFitted variant='enclosed' colorScheme={"secondary"} mt={4} mx={2} isLazy>
				<TabList mb='1em' color={"white"}>
					<Tab>Stats</Tab>
					<Tab>Draftboard</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<Grid
						
							templateAreas={[mobileGrid, desktopGrid]}
							gridTemplateColumns={['1fr', '1fr 1fr']}
							mx={5}
						>
							<GridItem area={'draft_cards'}>
								<DraftPageStatGroup league={context} />
							</GridItem>
							<GridItem area={'draft_table'} overflowY={'auto'} maxH={'800px'}>
								<DraftValueTable draft={context.draft} />
							</GridItem>
							<GridItem area={'draft_chart'} minHeight={'300px'} maxH={'800px'}>
								<DraftValueBarChart league={context} />
							</GridItem>
						</Grid>
					</TabPanel>
					<TabPanel>
						<DraftBoard league={context}/>
					</TabPanel>
				</TabPanels>
			</Tabs>
	)
}

export default Page