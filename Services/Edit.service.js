import axios from "axios";

class EditService {
    async updateBlog(blogId, title, content, category, imageFile) {
        const blogUpdateUrl = process.env.NEXT_PUBLIC_API_URL;

        console.log("API Base URL:", blogUpdateUrl); 

        const formData = new FormData();
        formData.append('title', title.trim());
        formData.append('content', content);
        formData.append('category', category.trim());
        
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const res = await axios.put(`${blogUpdateUrl}/blogs/${blogId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('API Response:', res.data); 

            if (res.status === 200 || res.status === 204) {
                return {
                    message: 'Blog updated successfully',
                    data: res.data
                };
            } else {
                return {
                    message: res.data?.message || 'Failed to update the blog'
                };
            }
        } catch (error) {
            console.log('Update blog error:', error);
            console.log('Error response:', error.response); 
            return {
                message: error.response?.data?.message || 'Error occurred while updating the blog!'
            };
        }
    }
}

export default new EditService();
