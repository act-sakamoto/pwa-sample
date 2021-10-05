import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { styled } from '@mui/material/styles';

type Props = {
  alertOpen: boolean;
  toggleAlert: () => void;
  onEmpty: () => void;
};

const Alert = styled(Dialog)(() => ({
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

export const AlertDialog = (props: Props) => {
  return (
    <Alert open={props.alertOpen} onClose={props.toggleAlert}>
      <DialogTitle>アラート</DialogTitle>
      <DialogContent>
        <DialogContentText>
          本当にごみ箱を完全に空にしますか？
        </DialogContentText>
        <DialogContentText>この操作は取り消しできません。</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.toggleAlert} color="primary" aria-label="cancel">
          キャンセル
        </Button>
        <Button
          onClick={() => {
            props.toggleAlert();
            props.onEmpty();
          }}
          color="secondary"
          aria-label="ok"
          autoFocus
        >
          OK
        </Button>
      </DialogActions>
    </Alert>
  );
};