import quiz from '../images/quiz.png';

const style = {
  width: '200px',
  display: 'block',
  margin: '0 auto'
}

const Header: React.FC = () => (
  <img style={style} src={quiz} alt='quiz' />
)

export default Header;