package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Empresa;
import com.soluvel.conectre.domain.Plano;
import com.soluvel.conectre.domain.records.EmpresaReduceRecords;
import com.soluvel.conectre.repository.EmpresaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class EmpresaService extends CrudService<Empresa, Long> {

    private final EmpresaRepository repository;

    public EmpresaService(CrudRepository<Empresa, Long> repository,
                          EmpresaRepository empresaRepository) {
        super(repository);
        this.repository = empresaRepository;
    }

    public Page<Empresa> page(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Page<Empresa> pageWithFilter(String filter, Pageable pageable) {
        return repository.findByRazaoSocialContaining(filter, pageable);
    }

    public Page<Empresa> pageWithFilterCidade(String filter, Pageable pageable) {
        return repository.findByCidadeContaining(filter, pageable);
    }

    public Page<Empresa> empresaFilter(List<Plano> planos, List<String> cidades, List<String> empresas, Pageable pageable) {

        if (Objects.nonNull(cidades)) {
            cidades = cidades.stream()
                    .map(palavra -> {
                        int indiceHifen = palavra.indexOf("-");
                        return indiceHifen != -1 ? palavra.substring(0, indiceHifen).trim() : palavra;
                    })
                    .toList();
        }

        return repository.empresaFilter(planos, cidades, empresas, pageable);
    }

    public List<String> getCidades() {
        return repository.getCidades();
    }

    public List<String> getRazaoSocial() {
        return repository.getRazaoSocial();
    }

    public List<EmpresaReduceRecords> findAllReduce() {
        return repository.findAllReduce();
    }
}
