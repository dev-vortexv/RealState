import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ButtonBase, Box } from '@mui/material';

// project imports
import config from 'config';
import { MENU_OPEN } from 'store/actions';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      disableRipple
      onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
      component={Link}
      to={config.defaultPath}
    >
      <Box component="img" src="/realstate_Logo.png" sx={{ width: 150 }}></Box>
    </ButtonBase>
  );
};

export default LogoSection;
