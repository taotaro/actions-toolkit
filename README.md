## Usage

Build steps

1. `npm run prepare`
2. push code

```yaml
- name: Deploy to SAE
  uses: taotaro/deploy-to-sae@release-v1
  with:
    access-key: ${{ secrets.ALICLOUD_ACCESS_KEY_ID }}
    secret-key: ${{ secrets.ALICLOUD_ACCESS_KEY_SECRET }}
    region-id: ${{ secrets.ALICLOUD_REGION_ID }}
    app-id: ${{ secrets.SAE_APP_ID }}
    image-url: ${{ env.IMAGE_URL }}
```