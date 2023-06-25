import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { selectors as channelsSelectors, sendRemoveChannel } from '../slices/channelsSlice';
import { setIdToProcess, setModalRemoveChannelVisibility } from '../slices/modalSlice';

const RemoveChannelForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const id = useSelector((state) => state.modal.idToProcess);
  const { name } = channels.find((channel) => channel.id === id);

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(sendRemoveChannel({ id }));
    dispatch(setIdToProcess(null));
    handleClose();
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ name }}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
      }) => (
        <Form noValidate className="py-1">
          <div className="input-group pb-3">
            {t('modals.remove')}
            {' '}
            {name}
            ?
          </div>
          <div className="d-flex justify-content-end align-items-center">
            <Button
              type="button"
              variant="secondary"
              className="me-2"
              onClick={handleClose}
            >
              {t('modals.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="danger"
              default
            >
              {t('modals.submit')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const ModalRemoveChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state) => state.modal.isModalRemoveChannelVisible);

  useEffect(() => {
    if (isModalVisible) {
      const input = document.querySelector('[name="name"]');
      if (input) {
        input.focus();
      }
    }
  }, [isModalVisible]);

  const handleClose = () => {
    dispatch(setModalRemoveChannelVisibility(false));
  };

  return (
    <Modal show={isModalVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modals.remove')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RemoveChannelForm handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalRemoveChannel;
