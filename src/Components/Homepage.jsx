import Title from './Title.jsx';
import FromTo from './FromTo.jsx';
import Filters from './Filters.jsx';
import Blocks from '../Blocks.jsx';
import Searching from './Searching.jsx';

function Homepage() {

    // eslint-disable-next-line
    const imageURL1 = "https://i.pinimg.com/originals/4b/a7/2c/4ba72cbf2a6495c267d3707d1e3fac00.jpg";
    return (
        <>
            <Title />
            <FromTo />
            <Filters />
            <Searching />
        </>
    )
}

export default Homepage