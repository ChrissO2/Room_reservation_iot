import { PasswordResetRequest } from '../PasswordResetRequests';
import { PasswordResetRequestField, PasswordResetRequestFieldsWrapper } from './PasswordResetRequestRow.style';

interface PasswordResetRequestRowProps {
    request: PasswordResetRequest;
}

const PasswordResetRequestRow = ({ request }: PasswordResetRequestRowProps) => {
    return (
        <>
            {request
                ? Object.values(request).map((property) => (
                      <PasswordResetRequestField>{property}</PasswordResetRequestField>
                  ))
                : null}
        </>
    );
};
export default PasswordResetRequestRow;
