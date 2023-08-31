import React, { useEffect } from 'react';
import { Toast, Spinner } from 'flowbite-react';
import { HiX, HiCheck, HiClock } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { removeAlert } from './alertSlice';

const renderErrorToast = (message) => (
  <Toast>
    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center
      rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
    >
      <HiX className="h-5 w-5" />
    </div>
    <div className="ml-3 text-sm font-normal">
      {message}
    </div>
    <Toast.Toggle />
  </Toast>
);

const renderSuccessToast = (message) => (
  <Toast>
    <div className="inline-flex h-8 w-8 shrink-0 items-center
      justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
    >
      <HiCheck className="h-5 w-5" />
    </div>
    <div className="ml-3 text-sm font-normal">
      {message}
    </div>
    <Toast.Toggle />
  </Toast>
);

const renderLoadingToaster = () => (
  <Toast>
    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center
      rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
    >
      <HiClock className="h-5 w-5" />
    </div>
    <div className="ml-3 text-sm font-normal">
      <Spinner aria-label="Default status example" />
    </div>
    <Toast.Toggle />
  </Toast>
);

export function ToastAlert() {
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.alert.alerts);
  const loading = useSelector((state) => state.alert.loading);

  useEffect(() => {
    alerts.forEach((alert, index) => {
      setTimeout(() => {
        dispatch(removeAlert(index));
      }, 4000);
    });
  }, [alerts, dispatch]);

  const renderToast = (type, message) => {
    switch (type) {
      case 'error':
        return renderErrorToast(message);
      case 'success':
        return renderSuccessToast(message);
      default:
        return null;
    }
  };

  return (
    <div>
      {
        loading && (
          renderLoadingToaster()
        )
      }
      {
        alerts.map((alert) => (
          <div key={alert.message}>
            {renderToast(alert.type, alert.message)}
          </div>
        ))
      }
    </div>
  );
}
