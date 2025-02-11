import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
          path: '/',
          component: () => import('@/view/Home.vue')
        },
        {
          path: '/equipamento',
          component: () => import('@/view/EquipamentoIndex.vue')
        },
        {
          path: '/item',
          component: () => import('@/view/ItemIndex.vue')
        },
        {
          path: '/manutencao',
          component: () => import('@/view/ManutencaoIndex.vue')
        },
        {
          path: '/modelo',
          component: () => import('@/view/ModeloIndex.vue')
        },
        {
          path: '/servico',
          component: () => import('@/view/OrdemServico.vue')
        },
    ]
});

export default router;
