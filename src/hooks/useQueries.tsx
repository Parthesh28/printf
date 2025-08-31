import { DocumentPickerResponseOpenLongTerm } from "@react-native-documents/picker";
import { useMutation } from "@tanstack/react-query";

const SERVER_URL = "YOUR_SERVER_LINK"

export const useFileUpload = () => {
    return useMutation({
        mutationFn: async ({ file, authToken }: { file: DocumentPickerResponseOpenLongTerm, authToken:  string | null | undefined}) => {
            const formData = new FormData();

            formData.append('file', {
                uri: decodeURI(file.uri),
                type: file.type,
                name: file.name
            });
            const headers = {
                'Content-Type': 'multipart/form-data',
                'xxx-auth-token': authToken!,
            }
            const response = await fetch(`${SERVER_URL}/files/upload`, {
                method: 'POST',
                headers,
                body: formData,
            });

            if (!(response.status == 200)) {
                throw new Error('Upload failed');
            }

            return response.json();
        },
    });
}