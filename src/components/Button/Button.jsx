import { Box } from 'components/Box';
import { ButtonStyled } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick = () => {} }) => {
  return (
    <>
      <Box display="flex" justifyContent="center" py="20px">
        <ButtonStyled type="button" onClick={() => onClick()}>
          Load more
        </ButtonStyled>
      </Box>
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
